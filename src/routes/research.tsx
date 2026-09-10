import { createFileRoute } from "@tanstack/react-router";
import {
  Cell,
  Chip,
  DataTable,
  Field,
  PageHeader,
  Panel,
  PlaceholderNote,
  Row,
  StatusChip,
} from "@/components/lab/primitives";
import {
  useOpenProblems,
  usePapers,
  useResearchProjects,
  useResearchQuestions,
} from "@/lib/api/hooks";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Research — Frontier AI Lab" },
      {
        name: "description",
        content:
          "Research projects, questions, hypotheses, papers, findings, decisions and open problems for the lab.",
      },
      { property: "og:title", content: "Research — Frontier AI Lab" },
      {
        property: "og:description",
        content: "Research projects, questions, hypotheses, findings and open problems.",
      },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  const { data: projects = [] } = useResearchProjects();
  const { data: questions = [] } = useResearchQuestions();
  const { data: problems = [] } = useOpenProblems();
  const { data: papers = [] } = usePapers();

  return (
    <div className="space-y-3">
      <PageHeader
        title="Research"
        description="The scientific workspace: projects, the questions behind them, and the decisions they produce. Records here are the source of truth for reproducibility."
        meta={<Chip tone="neutral">Placeholder records</Chip>}
      />

      <div className="grid gap-3 lg:grid-cols-2">
        {projects.map((p) => (
          <Panel key={p.id} title={p.id} meta={p.createdAt} action={<StatusChip status={p.status} />}>
            <h3 className="text-[15px] font-semibold tracking-tight">{p.title}</h3>
            <p className="mt-1.5 text-[12px] text-muted-foreground">{p.objective}</p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <Field label="Owner" value={p.owner} />
              <Field label="Priority" value={p.priority} />
            </div>
            <div className="mt-3">
              <p className="text-[10px] uppercase tracking-wider text-faint">Hypothesis</p>
              <p className="mt-1 text-[12px]">{p.hypothesis}</p>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {[...p.experimentIds, ...p.datasetIds, ...p.modelIds].map((ref) => (
                <Chip key={ref}>{ref}</Chip>
              ))}
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-faint">Findings</p>
                {p.findings.length ? (
                  <ul className="mt-1 space-y-1 text-[12px] text-muted-foreground">
                    {p.findings.map((f) => (
                      <li key={f}>· {f}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-1 font-mono text-[11px] text-faint">None recorded</p>
                )}
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-faint">Decisions</p>
                {p.decisions.length ? (
                  <ul className="mt-1 space-y-1 text-[12px] text-muted-foreground">
                    {p.decisions.map((d) => (
                      <li key={d}>· {d}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-1 font-mono text-[11px] text-faint">None recorded</p>
                )}
              </div>
            </div>
          </Panel>
        ))}
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        <Panel title="Research questions" meta={`${questions.length}`}>
          <DataTable columns={["ID", "Question", "Area", "Status"]}>
            {questions.map((q) => (
              <Row key={q.id}>
                <Cell mono muted>{q.id}</Cell>
                <Cell>{q.question}</Cell>
                <Cell muted>{q.area}</Cell>
                <Cell><StatusChip status={q.status} /></Cell>
              </Row>
            ))}
          </DataTable>
        </Panel>

        <Panel title="Open problems" meta={`${problems.length}`}>
          <ul className="space-y-2">
            {problems.map((p) => (
              <li key={p} className="hairline pb-2 text-[12px] text-muted-foreground last:border-0 last:pb-0">
                {p}
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        <Panel title="Papers" meta={`${papers.length}`}>
          <DataTable columns={["Title", "Authors", "Year", "Status"]}>
            {papers.map((p) => (
              <Row key={p.id}>
                <Cell>{p.title}</Cell>
                <Cell muted>{p.authors}</Cell>
                <Cell mono muted>{p.year}</Cell>
                <Cell><StatusChip status={p.status} /></Cell>
              </Row>
            ))}
          </DataTable>
        </Panel>

        <Panel title="Findings">
          <PlaceholderNote>
            No measured findings recorded. Findings are written only from executed experiments.
          </PlaceholderNote>
        </Panel>
      </div>
    </div>
  );
}
