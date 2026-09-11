import { createFileRoute } from "@tanstack/react-router";
import {
  Cell,
  Chip,
  DataTable,
  Metric,
  PageHeader,
  Panel,
  Row,
  StatusChip,
} from "@/components/lab/primitives";
import { useComputeNodes, useComputeSummary } from "@/lib/api/hooks";

export const Route = createFileRoute("/compute")({
  head: () => ({
    meta: [
      { title: "Compute — Frontier AI Lab" },
      {
        name: "description",
        content:
          "GPU inventory, allocation, utilisation, storage and network for the lab. Provider-agnostic: local, cloud, Kubernetes or Slurm.",
      },
      { property: "og:title", content: "Compute — Frontier AI Lab" },
      {
        property: "og:description",
        content: "GPU inventory, allocation and utilisation across a provider-agnostic backend.",
      },
    ],
  }),
  component: ComputePage,
});

function ComputePage() {
  const { data: nodes = [] } = useComputeNodes();
  const { data: summary } = useComputeSummary();

  return (
    <div className="space-y-3">
      <PageHeader
        title="Compute"
        description="Inventory and telemetry for every GPU the lab can reach. No provider is hard-coded: local machines, cloud pools, Kubernetes and Slurm all register through the same node contract."
        meta={<Chip tone="warn">No nodes connected</Chip>}
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Metric label="Total GPUs" value={summary?.totalGpus ?? 0} note="Registered" />
        <Metric label="Allocated" value={summary?.allocatedGpus ?? 0} />
        <Metric label="Utilization" value={null} note="Not connected" />
        <Metric label="Estimated cost" value={null} note="Not connected" />
      </div>

      <Panel title="GPU inventory" meta={`${nodes.length} nodes`}>
        <DataTable
          columns={[
            "Node",
            "Provider",
            "GPU type",
            "Count",
            "Allocated",
            "Utilization",
            "VRAM",
            "Temp",
            "Power",
            "Status",
          ]}
        >
          {nodes.map((n) => (
            <Row key={n.id}>
              <Cell mono>{n.label}</Cell>
              <Cell muted>{n.provider}</Cell>
              <Cell mono muted>{n.gpuType}</Cell>
              <Cell mono muted>{n.gpuCount}</Cell>
              <Cell mono muted>{n.allocated}</Cell>
              <Cell mono muted>{n.utilization ?? "—"}</Cell>
              <Cell mono muted>{n.vram ?? "—"}</Cell>
              <Cell mono muted>{n.temperature ?? "—"}</Cell>
              <Cell mono muted>{n.power ?? "—"}</Cell>
              <Cell><StatusChip status={n.status} /></Cell>
            </Row>
          ))}
        </DataTable>
      </Panel>

      <div className="grid gap-3 lg:grid-cols-3">
        <Metric label="Training jobs" value={0} note="No backend" />
        <Metric label="Inference jobs" value={0} note="No backend" />
        <Metric label="Storage" value={null} note="Not connected" />
      </div>
    </div>
  );
}
