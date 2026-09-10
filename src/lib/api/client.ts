/**
 * LabApi — the single contract between the control-plane UI and the backend.
 *
 * Today it is fulfilled by the mock adapter. A real backend (Python/FastAPI
 * services for /data, /training, /models, /evaluation, /compute, /experiments,
 * /inference, /research) can be dropped in behind `createHttpApi` without any
 * UI change. Read paths mirror the planned REST surface:
 *
 *   GET /research/projects        GET /models        GET /models/:id
 *   GET /experiments              GET /experiments/:id
 *   GET /training/runs            GET /datasets      GET /datasets/pipeline
 *   GET /benchmarks               GET /evaluations   GET /compute
 *
 * Future write paths (POST /experiments, /training/runs, /datasets,
 * /evaluations, /models) are declared as optional members so the UI can detect
 * capability rather than assume it.
 */

import type {
  ActivityEntry,
  Alert,
  ApiKeyRecord,
  AuditLogEntry,
  BackendStatus,
  Benchmark,
  ComputeNode,
  ComputeSummary,
  DatasetRecord,
  DocPage,
  EvaluationRun,
  Experiment,
  Milestone,
  ModelRecord,
  Paper,
  PipelineStage,
  Program,
  ResearchProject,
  ResearchQuestion,
  RoadmapPhase,
  TeamMember,
  TrainingRun,
} from "./types";
import { createMockApi } from "./mock-adapter";

export interface LabApi {
  /** Identifies which implementation is serving data. */
  readonly kind: "mock" | "http";
  /** Whether a real ML/infrastructure backend is reachable. */
  readonly backend: BackendStatus;

  getProgram(): Promise<Program>;
  getAlerts(): Promise<Alert[]>;
  getActivity(): Promise<ActivityEntry[]>;

  getResearchProjects(): Promise<ResearchProject[]>;
  getResearchQuestions(): Promise<ResearchQuestion[]>;
  getOpenProblems(): Promise<string[]>;
  getPapers(): Promise<Paper[]>;

  getModels(): Promise<ModelRecord[]>;
  getModel(id: string): Promise<ModelRecord | undefined>;

  getExperiments(): Promise<Experiment[]>;
  getExperiment(id: string): Promise<Experiment | undefined>;

  getTrainingRuns(): Promise<TrainingRun[]>;

  getDatasets(): Promise<DatasetRecord[]>;
  getPipeline(): Promise<PipelineStage[]>;

  getBenchmarks(): Promise<Benchmark[]>;
  getEvaluationRuns(): Promise<EvaluationRun[]>;

  getComputeNodes(): Promise<ComputeNode[]>;
  getComputeSummary(): Promise<ComputeSummary>;

  getRoadmap(): Promise<RoadmapPhase[]>;
  getMilestones(): Promise<Milestone[]>;

  getTeam(): Promise<TeamMember[]>;
  getAuditLog(): Promise<AuditLogEntry[]>;
  getApiKeys(): Promise<ApiKeyRecord[]>;
  getDocs(): Promise<DocPage[]>;
}

let api: LabApi | null = null;

/** Resolves the active API implementation. Mock until a backend is configured. */
export function getApi(): LabApi {
  if (!api) {
    api = createMockApi();
  }
  return api;
}

export function setApi(next: LabApi) {
  api = next;
}
