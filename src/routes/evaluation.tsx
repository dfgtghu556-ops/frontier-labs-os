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
import { useBenchmarks, useEvaluationRuns } from "@/lib/api/hooks";
import { INDIAN_LANGUAGES } from "@/lib/api/mock-data";

export const Route = createFileRoute("/evaluation")({
  head: () => ({
    meta: [
      { title: "BHARAT EVAL — Frontier AI Lab" },
      {
        name: "description",
        content:
          "BHARAT EVAL: internal benchmark suite across reasoning, Indian knowledge, code-mixing, safety and agent performance in fourteen languages.",
      },
      { property: "og:title", content: "BHARAT EVAL — Frontier AI Lab" },
      {
        property: "og:description",
        content: "Internal evaluation platform: benchmarks, versioning, leaderboard and regression detection.",
      },
    ],
  }),
  component: EvaluationPage,
});

function EvaluationPage() {
  const { data: benchmarks = [] } = useBenchmarks();
  const { data: runs = [] } = useEvaluationRuns();

  return (
    <div className="space-y-3">
      <PageHeader
        title="BHARAT EVAL"
        description="The lab's internal evaluation platform. Benchmarks are authored and versioned here; scores appear only after a model exists and an evaluation run completes."
        meta={<Chip tone="warn">No scores recorded</Chip>}
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Metric label="Benchmarks defined" value={benchmarks.length} note="Draft / authoring" />
        <Metric label="Languages covered" value={INDIAN_LANGUAGES.length} />
        <Metric label="Evaluation runs" value={runs.length} note="None executed" />
        <Metric label="Regressions detected" value={null} note="No baseline" />
      </div>

      <Panel title="Benchmark suite" meta={`${benchmarks.length} categories`}>
        <DataTable
          columns={["ID", "Benchmark", "Category", "Version", "Items", "Type", "Contamination", "Status"]}
        >
          {benchmarks.map((b) => (
            <Row key={b.id}>
              <Cell mono muted>{b.id}</Cell>
              <Cell>{b.name}</Cell>
              <Cell muted>{b.category}</Cell>
              <Cell mono muted>{b.version}</Cell>
              <Cell mono muted>{b.items ?? "—"}</Cell>
              <Cell muted>{b.evaluationType}</Cell>
              <Cell mono muted>{b.contaminationChecked ? "checked" : "not checked"}</Cell>
              <Cell><StatusChip status={b.status} /></Cell>
            </Row>
          ))}
        </DataTable>
      </Panel>

      <div className="grid gap-3 lg:grid-cols-2">
        <Panel title="Leaderboard">
          <PlaceholderNote>
            Empty by design. No model has been trained or evaluated, so no score exists to rank.
          </PlaceholderNote>
        </Panel>
        <Panel title="Score history & regression detection">
          <PlaceholderNote>
            Requires at least two completed evaluation runs on the same benchmark version.
          </PlaceholderNote>
        </Panel>
      </div>

      <Panel title="Languages" meta={`${INDIAN_LANGUAGES.length}`}>
        <div className="flex flex-wrap gap-1.5">
          {INDIAN_LANGUAGES.map((l) => (
            <Chip key={l}>{l}</Chip>
          ))}
        </div>
      </Panel>

      <Panel title="Evaluation contract">
        <ul className="space-y-1 font-mono text-[11px] text-muted-foreground">
          <li>GET /benchmarks · GET /benchmarks/:id · GET /benchmarks/:id/versions</li>
          <li>GET /evaluations · POST /evaluations</li>
          <li>GET /evaluations/:id/scores · GET /evaluations/leaderboard</li>
          <li>POST /evaluations/human — human evaluation submissions</li>
        </ul>
      </Panel>
    </div>
  );
}
