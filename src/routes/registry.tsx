import { createFileRoute } from "@tanstack/react-router";
import {
  Chip,
  Field,
  PageHeader,
  Panel,
  StatusChip,
} from "@/components/lab/primitives";
import { useModels } from "@/lib/api/hooks";

export const Route = createFileRoute("/registry")({
  head: () => ({
    meta: [
      { title: "Model Registry — Frontier AI Lab" },
      {
        name: "description",
        content:
          "Versioned model registry: architecture, tokenizer version, training dataset version, compute, checkpoints, lineage, licence and evaluation version.",
      },
      { property: "og:title", content: "Model Registry — Frontier AI Lab" },
      {
        property: "og:description",
        content: "Full versioned record for every registered model entry.",
      },
    ],
  }),
  component: RegistryPage,
});

function RegistryPage() {
  const { data: models = [] } = useModels();

  return (
    <div className="space-y-3">
      <PageHeader
        title="Model Registry"
        description="The authoritative record for every model entity. Fields that only exist after a real training run stay explicitly empty."
        meta={<Chip tone="warn">No trained artifacts</Chip>}
      />

      <div className="grid gap-3 lg:grid-cols-2">
        {models.map((m) => (
          <Panel key={m.id} title={m.id} meta={m.createdAt} action={<StatusChip status={m.status} />}>
            <div className="flex items-baseline justify-between gap-2">
              <h2 className="font-mono text-[15px] font-semibold tracking-tight">{m.name}</h2>
              <Chip>{m.branch}</Chip>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <Field label="Family" value={m.family} />
              <Field label="Parameters" value={m.parameterCount} />
              <Field label="Context length" value={m.contextLength} />
              <Field label="Tokenizer version" value={m.tokenizerVersion} />
              <Field label="Dataset version" value={m.trainingDatasetVersion} fallback="Not trained" />
              <Field label="Training tokens" value={m.trainingTokens} fallback="Not trained" />
              <Field label="Training compute" value={m.trainingCompute} fallback="Not trained" />
              <Field label="Training duration" value={m.trainingDuration} fallback="Not trained" />
              <Field label="Checkpoint" value={m.checkpointLocation} fallback="None" />
              <Field label="Evaluation version" value={m.evaluationVersion} fallback="Not evaluated" />
              <Field label="Licence" value={m.license} />
              <Field label="Researcher" value={m.researcher} />
            </div>
            <div className="mt-3">
              <p className="text-[10px] uppercase tracking-wider text-faint">Architecture</p>
              <p className="mt-1 text-[12px]">{m.architecture}</p>
            </div>
            <p className="mt-3 font-mono text-[10px] text-faint">{m.notes}</p>
          </Panel>
        ))}
      </div>
    </div>
  );
}
