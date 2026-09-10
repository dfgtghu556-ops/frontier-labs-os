import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Chip,
  DataTable,
  Cell,
  Field,
  Metric,
  Panel,
  Row,
  StatusChip,
} from "@/components/lab/primitives";
import {
  useActivity,
  useAlerts,
  useComputeSummary,
  useDatasets,
  useExperiments,
  useMilestones,
  usePipeline,
  useProgram,
  useTrainingRuns,
} from "@/lib/api/hooks";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Overview — Frontier AI Lab Control Plane" },
      {
        name: "description",
        content:
          "Current research programme, active experiments, data pipeline state and compute availability for the Bharat Foundation project.",
      },
      { property: "og:title", content: "Overview — Frontier AI Lab Control Plane" },
      {
        property: "og:description",
        content: "Current research programme, experiments, pipeline and compute state.",
      },
    ],
  }),
  component: Overview,
});

function Overview() {
  const { data: program } = useProgram();
  const { data: experiments = [] } = useExperiments();
  const { data: runs = [] } = useTrainingRuns();
  const { data: pipeline = [] } = usePipeline();
  const { data: datasets = [] } = useDatasets();
  const { data: alerts = [] } = useAlerts();
  const { data: activity = [] } = useActivity();
  const { data: compute } = useComputeSummary();

  const running = experiments.filter((e) => e.status === "RUNNING").length;
  const queued = experiments.filter((e) => e.status === "QUEUED").length;
  const planned = experiments.filter((e) => e.status === "PLANNED").length;

  return (
    <div className="space-y-3">
      <Panel>
        <p className="label-xs">Current program</p>
        <p className="mt-2 text-pretty text-base font-semibold tracking-tight">
          {program?.project ?? "—"}
        </p>
        <div className="mt-3 grid grid-cols-2 gap-px overflow-hidden rounded-[8px] bg-line/70 lg:grid-cols-4">
          <div className="bg-surface/80 p-2.5">
            <Field label="Phase" value={program?.phase ?? null} />
          </div>
          <div className="bg-surface/80 p-2.5">
            <Field label="Status" value={program?.status ?? null} />
          </div>
          <div className="bg-surface/80 p-2.5">
            <Field label="Current model" value={program?.currentModel ?? null} />
          </div>
          <div className="bg-surface/80 p-2.5">
            <Field label="Latest benchmark" fallback="Not available yet" value={null} />
          </div>
        </div>
        <p className="mt-3 font-mono text-[10px] text-faint">
          Training: {program?.training.replace(/_/g, " ") ?? "—"} · no model has been trained
        </p>
      </Panel>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Metric
          label="Active experiments"
          value={experiments.length}
          note={`${running} running · ${queued} queued · ${planned} planned`}
        />
        <Metric label="Training jobs" value={runs.length} note="No run has executed" />
        <Metric label="GPU utilization" value={null} note="Not connected" />
        <Metric
          label="Dataset candidates"
          value={datasets.length}
          note="Awaiting backend metrics"
        />
      </div>

      <div className="grid gap-3 lg:grid-cols-3">
        <Panel title="Data pipeline" meta={`${pipeline.length} stages`} className="lg:col-span-2">
          <ul>
            {pipeline.map((stage) => (
              <li key={stage.id} className="hairline flex items-center gap-2.5 py-2 last:border-0">
                <span
                  className={
                    stage.status === "ready"
                      ? "size-2 shrink-0 rounded-full bg-accent"
                      : "size-2 shrink-0 rounded-full bg-line"
                  }
                />
                <span className="w-44 truncate text-[11px] font-medium">{stage.name}</span>
                <span className="ml-auto font-mono text-[10px] text-faint">
                  {stage.version} · {stage.status.replace(/_/g, " ")}
                </span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Critical alerts" meta={`${alerts.length}`}>
          <ul className="space-y-2">
            {alerts.map((a) => (
              <li key={a.id} className="rounded-[10px] bg-foreground/[0.03] p-2.5">
                <div className="flex items-center justify-between gap-2">
                  <Chip tone={a.severity === "critical" ? "fail" : a.severity === "warning" ? "warn" : "neutral"}>
                    {a.area}
                  </Chip>
                  <span className="font-mono text-[9px] text-faint">{a.at}</span>
                </div>
                <p className="mt-1.5 text-[12px] text-muted-foreground">{a.message}</p>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel
        title="Experiments"
        meta={`${experiments.length} total`}
        action={
          <Link to="/experiments" className="font-mono text-[10px] uppercase tracking-wider text-accent">
            View all
          </Link>
        }
      >
        <DataTable columns={["ID", "Experiment", "Model config", "Researcher", "Status"]}>
          {experiments.slice(0, 5).map((e) => (
            <Row key={e.id}>
              <Cell mono muted>{e.id}</Cell>
              <Cell>{e.name}</Cell>
              <Cell mono muted>{e.modelConfig}</Cell>
              <Cell muted>{e.researcher}</Cell>
              <Cell><StatusChip status={e.status} /></Cell>
            </Row>
          ))}
        </DataTable>
      </Panel>

      <div className="grid gap-3 lg:grid-cols-3">
        <Panel title="Compute" meta="0 nodes connected" className="lg:col-span-2">
          <div className="grid grid-cols-3 gap-px overflow-hidden rounded-[8px] bg-line/70">
            {["GPU", "VRAM", "Power"].map((l) => (
              <div key={l} className="bg-surface/80 p-2 text-center">
                <p className="font-mono text-base font-semibold tracking-tight text-faint">—</p>
                <p className="text-[9px] uppercase tracking-wider text-faint">{l}</p>
              </div>
            ))}
          </div>
          <p className="mt-2.5 font-mono text-[10px] text-faint">
            Awaiting cluster backend · provider-agnostic (local / cloud / Kubernetes / Slurm)
            {compute ? ` · ${compute.allocatedGpus}/${compute.totalGpus} GPUs allocated` : ""}
          </p>
        </Panel>

        <Panel title="Recent activity">
          <ul className="space-y-2">
            {activity.map((a) => (
              <li key={a.id} className="hairline flex gap-2.5 pb-2 last:border-0 last:pb-0">
                <span className="font-mono text-[10px] text-faint">{a.at}</span>
                <span className="text-[12px] text-muted-foreground">
                  {a.message} <span className="font-mono text-[11px] text-faint">{a.entity}</span>
                </span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <MilestoneStrip />
    </div>
  );
}

function MilestoneStrip() {
  const { data: milestones = [] } = useMilestones();
  return (
    <Panel title="Research milestones">
      <DataTable columns={["Milestone", "Phase", "Target", "Status"]}>
        {milestones.map((m) => (
          <Row key={m.id}>
            <Cell>{m.title}</Cell>
            <Cell mono muted>{m.phase}</Cell>
            <Cell mono muted>{m.target}</Cell>
            <Cell><StatusChip status={m.status} /></Cell>
          </Row>
        ))}
      </DataTable>
    </Panel>
  );
}
