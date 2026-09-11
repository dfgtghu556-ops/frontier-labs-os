import { createFileRoute } from "@tanstack/react-router";
import {
  Cell,
  Chip,
  DataTable,
  Metric,
  PageHeader,
  Panel,
  PlaceholderNote,
  Row,
  StatusChip,
} from "@/components/lab/primitives";
import { useTrainingRuns } from "@/lib/api/hooks";

export const Route = createFileRoute("/training")({
  head: () => ({
    meta: [
      { title: "Training — Frontier AI Lab" },
      {
        name: "description",
        content:
          "Training control centre: job queue, GPU allocation, throughput, checkpoints and loss curves. Awaiting a training backend.",
      },
      { property: "og:title", content: "Training — Frontier AI Lab" },
      {
        property: "og:description",
        content: "Job queue, allocation, throughput and checkpoint state for training runs.",
      },
    ],
  }),
  component: TrainingPage,
});

const BUCKETS = ["running", "queued", "completed", "failed"] as const;

function TrainingPage() {
  const { data: runs = [] } = useTrainingRuns();

  return (
    <div className="space-y-3">
      <PageHeader
        title="Training"
        description="This interface controls and observes training jobs; it does not perform training. A separate Python service layer executes runs and reports state back through the training API."
        meta={<Chip tone="warn">Backend not connected</Chip>}
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {BUCKETS.map((b) => (
          <Metric
            key={b}
            label={`${b} jobs`}
            value={runs.filter((r) => r.status === b).length}
            note={b === "queued" ? "Cannot start without compute" : undefined}
          />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Metric label="GPU allocation" value={null} note="Not connected" />
        <Metric label="GPU utilization" value={null} note="Not connected" />
        <Metric label="Memory utilization" value={null} note="Not connected" />
        <Metric label="Throughput (tok/s)" value={null} note="Not connected" />
      </div>

      <Panel title="Job queue" meta={`${runs.length} submitted`}>
        {runs.length ? (
          <DataTable
            columns={[
              "Run",
              "Experiment",
              "Status",
              "Allocation",
              "Tok/s",
              "ETA",
              "Checkpoint",
              "Train loss",
              "Val loss",
            ]}
          >
            {runs.map((r) => (
              <Row key={r.id}>
                <Cell mono>{r.id}</Cell>
                <Cell mono muted>{r.experimentId}</Cell>
                <Cell><StatusChip status={r.status} /></Cell>
                <Cell mono muted>{r.gpuAllocation ?? "—"}</Cell>
                <Cell mono muted>{r.tokensPerSecond ?? "—"}</Cell>
                <Cell mono muted>{r.estimatedCompletion ?? "—"}</Cell>
                <Cell mono muted>{r.checkpointStatus ?? "—"}</Cell>
                <Cell mono muted>{r.trainingLoss ?? "—"}</Cell>
                <Cell mono muted>{r.validationLoss ?? "—"}</Cell>
              </Row>
            ))}
          </DataTable>
        ) : (
          <PlaceholderNote>No training runs submitted.</PlaceholderNote>
        )}
      </Panel>

      <div className="grid gap-3 lg:grid-cols-2">
        <Panel title="Loss curves">
          <PlaceholderNote>
            No loss data. Curves render once a training backend streams metrics.
          </PlaceholderNote>
        </Panel>
        <Panel title="Checkpoints">
          <PlaceholderNote>No checkpoints written.</PlaceholderNote>
        </Panel>
      </div>

      <Panel title="Backend contract">
        <p className="text-[12px] text-muted-foreground">
          The training service is expected to expose these endpoints. Any implementation
          satisfying them — a single workstation or a large distributed cluster — works
          unchanged with this interface.
        </p>
        <ul className="mt-2 space-y-1 font-mono text-[11px] text-muted-foreground">
          <li>GET /training/runs · GET /training/runs/:id</li>
          <li>POST /training/runs · POST /training/runs/:id/abort</li>
          <li>GET /training/runs/:id/metrics (stream)</li>
          <li>GET /training/runs/:id/checkpoints</li>
        </ul>
      </Panel>
    </div>
  );
}
