/**
 * Mock implementation of LabApi. Serves clearly-labelled placeholder records.
 * It never invents metrics: anything requiring a real backend is null.
 */

import type { LabApi } from "./client";
import * as data from "./mock-data";

const delay = <T,>(value: T): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), 60));

export function createMockApi(): LabApi {
  return {
    kind: "mock",
    backend: "not_connected",

    getProgram: () => delay(data.program),
    getAlerts: () => delay(data.alerts),
    getActivity: () => delay(data.activity),

    getResearchProjects: () => delay(data.researchProjects),
    getResearchQuestions: () => delay(data.researchQuestions),
    getOpenProblems: () => delay(data.openProblems),
    getPapers: () => delay(data.papers),

    getModels: () => delay(data.models),
    getModel: (id) => delay(data.models.find((m) => m.id === id)),

    getExperiments: () => delay(data.experiments),
    getExperiment: (id) => delay(data.experiments.find((e) => e.id === id)),

    getTrainingRuns: () => delay(data.trainingRuns),

    getDatasets: () => delay(data.datasets),
    getPipeline: () => delay(data.pipelineStages),

    getBenchmarks: () => delay(data.benchmarks),
    getEvaluationRuns: () => delay(data.evaluationRuns),

    getComputeNodes: () => delay(data.computeNodes),
    getComputeSummary: () => delay(data.computeSummary),

    getRoadmap: () => delay(data.roadmapPhases),
    getMilestones: () => delay(data.milestones),

    getTeam: () => delay(data.team),
    getAuditLog: () => delay(data.auditLog),
    getApiKeys: () => delay(data.apiKeys),
    getDocs: () => delay(data.docs),
  };
}
