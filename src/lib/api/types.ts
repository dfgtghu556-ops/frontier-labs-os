/**
 * Domain types for the Frontier AI Lab control plane.
 *
 * These types are the contract between the UI and ANY backend implementation.
 * The current implementation is a mock adapter (see ./mock-adapter.ts); a real
 * Python/PyTorch service layer can replace it without touching the UI.
 */

export type BackendStatus = "connected" | "not_connected" | "awaiting_backend";

export type ExperimentStatus =
  | "PLANNED"
  | "QUEUED"
  | "RUNNING"
  | "COMPLETED"
  | "FAILED"
  | "ABORTED";

export type TrainingStatus = "queued" | "running" | "completed" | "failed" | "not_started";

export type ResearchStatus = "open" | "active" | "blocked" | "completed" | "archived";
export type Priority = "P0" | "P1" | "P2" | "P3";

/** Any value that is not yet measurable is represented explicitly, never faked. */
export type Unknown = null;

export interface Program {
  id: string;
  project: string;
  phase: string;
  currentModel: string;
  status: string;
  training: TrainingStatus;
  latestBenchmark: string | Unknown;
}

export interface ResearchProject {
  id: string;
  title: string;
  objective: string;
  hypothesis: string;
  owner: string;
  status: ResearchStatus;
  priority: Priority;
  createdAt: string;
  experimentIds: string[];
  datasetIds: string[];
  modelIds: string[];
  findings: string[];
  decisions: string[];
  notes: string;
}

export interface ResearchQuestion {
  id: string;
  question: string;
  area: string;
  status: ResearchStatus;
  owner: string;
}

export interface Paper {
  id: string;
  title: string;
  authors: string;
  year: number;
  relevance: string;
  status: "to_read" | "reading" | "read";
}

export interface ModelRecord {
  id: string;
  name: string;
  family: string;
  parameterCount: string;
  architecture: string;
  tokenizerVersion: string;
  contextLength: number | Unknown;
  trainingDatasetVersion: string | Unknown;
  trainingTokens: string | Unknown;
  trainingCompute: string | Unknown;
  trainingDuration: string | Unknown;
  checkpointLocation: string | Unknown;
  status: "roadmap" | "design" | "in_research" | "trained" | "deprecated";
  evaluationVersion: string | Unknown;
  license: string;
  parentModelId: string | Unknown;
  branch: "base" | "reasoning" | "vision" | "speech" | "multimodal" | "agent";
  createdAt: string;
  researcher: string;
  notes: string;
}

export interface Experiment {
  id: string;
  name: string;
  hypothesis: string;
  modelConfig: string;
  tokenizer: string;
  datasetVersion: string;
  tokens: string | Unknown;
  batchSize: number | Unknown;
  learningRate: string | Unknown;
  optimizer: string;
  scheduler: string;
  contextLength: number | Unknown;
  precision: string;
  gpuType: string | Unknown;
  gpuCount: number | Unknown;
  duration: string | Unknown;
  checkpoint: string | Unknown;
  loss: number | Unknown;
  validationLoss: number | Unknown;
  benchmarkResults: string | Unknown;
  notes: string;
  researcher: string;
  status: ExperimentStatus;
  createdAt: string;
}

export interface TrainingRun {
  id: string;
  experimentId: string;
  name: string;
  status: TrainingStatus;
  gpuAllocation: string | Unknown;
  gpuUtilization: number | Unknown;
  memoryUtilization: number | Unknown;
  tokensPerSecond: number | Unknown;
  estimatedCompletion: string | Unknown;
  checkpointStatus: string | Unknown;
  trainingLoss: number | Unknown;
  validationLoss: number | Unknown;
  submittedAt: string;
}

export interface DatasetRecord {
  id: string;
  name: string;
  languages: string[];
  domain: string;
  source: string;
  licensingStatus: "cleared" | "under_review" | "restricted" | "unknown";
  collectionMethod: string;
  size: string | Unknown;
  tokenCount: string | Unknown;
  qualityScore: number | Unknown;
  duplicateRate: number | Unknown;
  filteringVersion: string;
  contaminationStatus: "not_checked" | "clean" | "flagged";
  piiStatus: "not_checked" | "scrubbed" | "flagged";
  copyrightStatus: "not_checked" | "cleared" | "flagged";
  documentation: string;
  owner: string;
  version: string;
  updatedAt: string;
}

export interface PipelineStage {
  id: string;
  name: string;
  status: "ready" | "idle" | "running" | "failed" | "not_configured";
  version: string;
  timestamp: string | Unknown;
  records: string | Unknown;
  tokens: string | Unknown;
  errors: number | Unknown;
  qualityMetric: string | Unknown;
}

export interface Benchmark {
  id: string;
  name: string;
  category: string;
  languages: string[];
  version: string;
  items: number | Unknown;
  evaluationType: "automated" | "human" | "hybrid";
  contaminationChecked: boolean;
  status: "draft" | "authoring" | "ready" | "deprecated";
  owner: string;
}

export interface EvaluationRun {
  id: string;
  benchmarkId: string;
  modelId: string;
  score: number | Unknown;
  status: "not_run" | "queued" | "running" | "completed";
  runAt: string | Unknown;
}

export interface ComputeNode {
  id: string;
  label: string;
  provider: string;
  gpuType: string;
  gpuCount: number;
  allocated: number;
  utilization: number | Unknown;
  vram: string | Unknown;
  temperature: number | Unknown;
  power: number | Unknown;
  status: "offline" | "online" | "draining" | "planned";
}

export interface ComputeSummary {
  backend: BackendStatus;
  totalGpus: number;
  allocatedGpus: number;
  storage: string | Unknown;
  network: string | Unknown;
  estimatedCost: string | Unknown;
}

export interface RoadmapPhase {
  id: string;
  index: number;
  title: string;
  objective: string;
  prerequisites: string[];
  researchQuestions: string[];
  engineering: string[];
  data: string[];
  compute: string[];
  evaluation: string[];
  successCriteria: string[];
  risks: string[];
  status: "active" | "planned" | "completed";
}

export interface Milestone {
  id: string;
  title: string;
  phase: string;
  target: string;
  status: "planned" | "in_progress" | "done";
}

export interface ActivityEntry {
  id: string;
  at: string;
  actor: string;
  entity: string;
  message: string;
}

export interface Alert {
  id: string;
  severity: "info" | "warning" | "critical";
  area: string;
  message: string;
  at: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: "admin" | "research_lead" | "researcher" | "data_engineer" | "infra" | "viewer";
  team: string;
  focus: string;
  status: "active" | "invited";
}

export interface AuditLogEntry {
  id: string;
  at: string;
  actor: string;
  action: string;
  target: string;
  ip: string;
}

export interface ApiKeyRecord {
  id: string;
  label: string;
  scope: string;
  createdAt: string;
  lastUsed: string | Unknown;
  status: "active" | "revoked";
}

export interface DocPage {
  id: string;
  title: string;
  section: string;
  summary: string;
  updatedAt: string;
}
