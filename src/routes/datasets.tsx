import { createFileRoute } from "@tanstack/react-router";
import {
  Cell,
  Chip,
  DataTable,
  Field,
  PageHeader,
  Panel,
  Row,
  StatusChip,
} from "@/components/lab/primitives";
import { useDatasets, usePipeline } from "@/lib/api/hooks";
import { INDIAN_LANGUAGES } from "@/lib/api/mock-data";

export const Route = createFileRoute("/datasets")({
  head: () => ({
    meta: [
      { title: "Datasets — Frontier AI Lab" },
      {
        name: "description",
        content:
          "Dataset registry and data pipeline for Indian-language pretraining corpora: provenance, licensing, PII, contamination and versioning.",
      },
      { property: "og:title", content: "Datasets — Frontier AI Lab" },
      {
        property: "og:description",
        content: "Dataset registry, provenance and the eleven-stage data pipeline.",
      },
    ],
  }),
  component: DatasetsPage,
});

function DatasetsPage() {
  const { data: datasets = [] } = useDatasets();
  const { data: pipeline = [] } = usePipeline();

  return (
    <div className="space-y-3">
      <PageHeader
        title="Datasets"
        description="Candidate corpora and the pipeline that will turn them into a versioned training mixture. Sizes and token counts appear only once the pipeline backend runs."
        meta={<Chip tone="warn">No corpus ingested</Chip>}
      />

      <Panel title="Data pipeline" meta={`${pipeline.length} stages`}>
        <DataTable
          columns={["Stage", "Status", "Version", "Timestamp", "Records", "Tokens", "Errors", "Quality"]}
        >
          {pipeline.map((s) => (
            <Row key={s.id}>
              <Cell>{s.name}</Cell>
              <Cell><StatusChip status={s.status} /></Cell>
              <Cell mono muted>{s.version}</Cell>
              <Cell mono muted>{s.timestamp ?? "—"}</Cell>
              <Cell mono muted>{s.records ?? "—"}</Cell>
              <Cell mono muted>{s.tokens ?? "—"}</Cell>
              <Cell mono muted>{s.errors ?? "—"}</Cell>
              <Cell mono muted>{s.qualityMetric ?? "—"}</Cell>
            </Row>
          ))}
        </DataTable>
        <p className="mt-3 font-mono text-[10px] text-faint">
          Raw data → ingestion → language ID → quality filtering → deduplication → PII/safety →
          licence/provenance → contamination → tokenization → training dataset → versioned dataset
        </p>
      </Panel>

      <Panel title="Supported languages" meta={`${INDIAN_LANGUAGES.length} configured`}>
        <div className="flex flex-wrap gap-1.5">
          {INDIAN_LANGUAGES.map((l) => (
            <Chip key={l}>{l}</Chip>
          ))}
          <Chip tone="neutral">+ additional Indian languages</Chip>
        </div>
      </Panel>

      <div className="grid gap-3 lg:grid-cols-2">
        {datasets.map((d) => (
          <Panel
            key={d.id}
            title={d.id}
            meta={`${d.version} · ${d.updatedAt}`}
            action={<StatusChip status={d.licensingStatus} />}
          >
            <h3 className="text-[15px] font-semibold tracking-tight">{d.name}</h3>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <Field label="Domain" value={d.domain} />
              <Field label="Source" value={d.source} />
              <Field label="Collection" value={d.collectionMethod} />
              <Field label="Size" value={d.size} fallback="Awaiting backend" />
              <Field label="Tokens" value={d.tokenCount} fallback="Awaiting backend" />
              <Field label="Quality score" value={d.qualityScore} fallback="Not measured" />
              <Field label="Duplicate rate" value={d.duplicateRate} fallback="Not measured" />
              <Field label="Filtering" value={d.filteringVersion} />
              <Field label="Owner" value={d.owner} />
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <Chip tone="warn">PII: {d.piiStatus.replace(/_/g, " ")}</Chip>
              <Chip tone="warn">Contamination: {d.contaminationStatus.replace(/_/g, " ")}</Chip>
              <Chip tone="warn">Copyright: {d.copyrightStatus.replace(/_/g, " ")}</Chip>
            </div>
            <div className="mt-3">
              <p className="text-[10px] uppercase tracking-wider text-faint">Languages</p>
              <div className="mt-1.5 flex flex-wrap gap-1">
                {d.languages.map((l) => (
                  <span key={l} className="font-mono text-[10px] text-muted-foreground">
                    {l}
                  </span>
                ))}
              </div>
            </div>
            <p className="mt-3 font-mono text-[10px] text-faint">Documentation: {d.documentation}</p>
          </Panel>
        ))}
      </div>
    </div>
  );
}
