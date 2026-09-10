import { useQuery } from "@tanstack/react-query";
import { getApi } from "./client";

const api = () => getApi();

const q = <T,>(key: string[], fn: () => Promise<T>) => ({ queryKey: key, queryFn: fn });

export const useProgram = () => useQuery(q(["program"], () => api().getProgram()));
export const useAlerts = () => useQuery(q(["alerts"], () => api().getAlerts()));
export const useActivity = () => useQuery(q(["activity"], () => api().getActivity()));

export const useResearchProjects = () =>
  useQuery(q(["research", "projects"], () => api().getResearchProjects()));
export const useResearchQuestions = () =>
  useQuery(q(["research", "questions"], () => api().getResearchQuestions()));
export const useOpenProblems = () =>
  useQuery(q(["research", "problems"], () => api().getOpenProblems()));
export const usePapers = () => useQuery(q(["research", "papers"], () => api().getPapers()));

export const useModels = () => useQuery(q(["models"], () => api().getModels()));
export const useExperiments = () => useQuery(q(["experiments"], () => api().getExperiments()));
export const useTrainingRuns = () => useQuery(q(["training", "runs"], () => api().getTrainingRuns()));
export const useDatasets = () => useQuery(q(["datasets"], () => api().getDatasets()));
export const usePipeline = () => useQuery(q(["datasets", "pipeline"], () => api().getPipeline()));
export const useBenchmarks = () => useQuery(q(["benchmarks"], () => api().getBenchmarks()));
export const useEvaluationRuns = () => useQuery(q(["evaluations"], () => api().getEvaluationRuns()));
export const useComputeNodes = () => useQuery(q(["compute", "nodes"], () => api().getComputeNodes()));
export const useComputeSummary = () =>
  useQuery(q(["compute", "summary"], () => api().getComputeSummary()));
export const useRoadmap = () => useQuery(q(["roadmap"], () => api().getRoadmap()));
export const useMilestones = () => useQuery(q(["milestones"], () => api().getMilestones()));
export const useTeam = () => useQuery(q(["team"], () => api().getTeam()));
export const useAuditLog = () => useQuery(q(["security", "audit"], () => api().getAuditLog()));
export const useApiKeys = () => useQuery(q(["security", "keys"], () => api().getApiKeys()));
export const useDocs = () => useQuery(q(["docs"], () => api().getDocs()));

export const useBackendStatus = () => getApi().backend;
