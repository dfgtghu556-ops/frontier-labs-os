# Frontier Labs OS

Build the initial internal platform for a new Indian frontier artificial-intelligence research company.

IMPORTANT CONTEXT:

This company is NOT an AI wrapper, chatbot wrapper, API reseller, or application that depends on OpenAI, Anthropic, Google Gemini, Meta, or another proprietary model for its core intelligence.

The long-term objective is to build a world-class frontier AI laboratory from India that develops its own foundation models from scratch, beginning with small experimental Transformer models and eventually scaling toward globally competitive large language models, reasoning models, multimodal models, speech models, and agentic systems.

The flagship foundation model must ultimately be trained from randomly initialized weights using our own data pipeline, tokenizer strategy, architecture/configuration, training infrastructure, evaluation framework, post-training pipeline, and model weights.

External AI systems may be used as development/research assistants, but they must remain replaceable tools and must never become the core intelligence dependency of the company's eventual AI products.

This Lovable project is the CONTROL PLANE / RESEARCH OPERATING SYSTEM for the company. It is NOT the actual model-training engine.

==================================================

PRODUCT NAME ==================================================

Use a temporary working name:

FRONTIER AI LAB

Do not permanently lock the company/model brand yet.

The UI should feel like a serious frontier AI research laboratory rather than a consumer chatbot.

Design language:

extremely professional

minimal

technical

premium

clean

calm

information-dense without being cluttered

dark/light theme support

excellent typography

responsive

desktop-first for research dashboards

mobile-friendly for monitoring

no unnecessary gradients

no fake AI marketing

no excessive animations

Think of the quality level of a serious research infrastructure platform.

================================================== 2. CORE PRINCIPLE

The system must clearly distinguish between:

A. Research B. Data C. Training D. Models E. Evaluation F. Infrastructure G. Experiments H. Products I. Documentation

Do not mix these concepts together.

================================================== 3. MAIN APPLICATION NAVIGATION

Create the following main navigation:

Overview

Research

Models

Experiments

Training

Datasets

Evaluation

Compute

Infrastructure

Model Registry

Documentation

Team

Security

Settings

Create a clean sidebar navigation.

================================================== 4. OVERVIEW DASHBOARD

Create a professional research-lab dashboard.

Show:

current research phase

current flagship model

active experiments

running training jobs

GPU utilization

compute availability

dataset status

latest evaluation results

latest model checkpoints

research milestones

critical alerts

recent activity

Example:

CURRENT PROGRAM

Project: PROJECT 001 — BHARAT FOUNDATION

Phase: Architecture + tokenizer research

Current model: Bharat-50M

Status: Research

Training: Not started / queued / running / completed

Latest benchmark: Not available yet

Do NOT fabricate real metrics.

Use clearly marked placeholder states until real backend data exists.

================================================== 5. RESEARCH MODULE

Create a research workspace.

Sections:

Research projects

Research questions

Hypotheses

Papers

Experiments

Findings

Decisions

Open problems

Research roadmap

Each research project should contain:

title

objective

hypothesis

owner

status

priority

created date

experiments

related datasets

related models

findings

decisions

notes

================================================== 6. MODEL REGISTRY

Create a model registry.

Every model should have:

model name

model family

parameter count

architecture

tokenizer version

context length

training dataset version

training token count

training compute

training duration

checkpoint location

current status

evaluation version

license

lineage

parent model if applicable

creation date

researcher

notes

Example models:

Bharat-50M Bharat-100M Bharat-300M Bharat-1B Bharat-3B Bharat-7B Bharat-14B

These are ROADMAP PLACEHOLDERS only.

Do not claim they exist.

================================================== 7. EXPERIMENT TRACKING

Create an experiment tracker.

Each experiment must support:

experiment ID

experiment name

hypothesis

model configuration

tokenizer

dataset version

number of tokens

batch size

learning rate

optimizer

scheduler

context length

precision

GPU type

GPU count

training duration

checkpoint

loss

validation loss

benchmark results

notes

researcher

status

Statuses:

PLANNED QUEUED RUNNING COMPLETED FAILED ABORTED

Allow comparison between experiments.

================================================== 8. TRAINING CONTROL CENTER

Build the interface for future training infrastructure.

Show:

active jobs

queued jobs

completed jobs

failed jobs

GPU allocation

GPU utilization

memory utilization

throughput

tokens/second

estimated completion

checkpoint status

training loss

validation loss

IMPORTANT:

This frontend must not pretend to actually train models.

Create clean API/service boundaries so that a real Python/PyTorch/cluster backend can later connect to this interface.

================================================== 9. DATASET REGISTRY

Create a serious dataset-management interface.

Dataset fields:

dataset ID

dataset name

language

domain

source

licensing status

collection method

size

token count

quality score

duplicate rate

filtering version

contamination status

PII status

copyright status

documentation

owner

version

date

Languages should support:

English Hindi Hinglish Bengali Tamil Telugu Marathi Gujarati Kannada Malayalam Punjabi Odia Assamese Urdu and additional Indian languages.

================================================== 10. DATA PIPELINE

Create a visual data-pipeline status interface:

RAW DATA ↓ INGESTION ↓ LANGUAGE IDENTIFICATION ↓ QUALITY FILTERING ↓ DEDUPLICATION ↓ PII / SAFETY FILTERING ↓ LICENSE / PROVENANCE CHECK ↓ CONTAMINATION CHECK ↓ TOKENIZATION ↓ TRAINING DATASET ↓ VERSIONED DATASET

Every stage should have:

status

version

timestamp

records

tokens

errors

quality metrics

================================================== 11. EVALUATION SYSTEM

Create an evaluation platform called:

BHARAT EVAL

This will eventually become one of the company's most important internal systems.

Categories:

Language Reasoning Mathematics Science Coding Indian knowledge Indian culture/context Education JEE NEET UPSC Legal reasoning Medical knowledge Long context Instruction following Safety Hallucination Tool use Agent performance Multilingual reasoning Code-mixing

Languages:

English Hindi Hinglish Tamil Telugu Bengali Marathi Gujarati Kannada Malayalam Punjabi Odia Assamese Urdu

The system must support:

benchmark creation

benchmark versioning

test datasets

automated evaluation

human evaluation

model comparison

score history

regression detection

leaderboard

contamination tracking

Do not fabricate benchmark scores.

================================================== 12. COMPUTE DASHBOARD

Create an infrastructure monitoring interface.

Show:

GPU inventory GPU type GPU count availability allocated GPUs utilization VRAM temperature power training jobs inference jobs storage network estimated compute cost

Architecture should allow future integration with:

local machines

cloud GPU providers

Kubernetes

Slurm

NVIDIA infrastructure

PyTorch distributed training

future internal GPU clusters

Do not hard-code a specific cloud provider.

================================================== 13. MODEL LINEAGE

Create a visual model lineage graph.

Example:

Bharat-50M ↓ Bharat-100M ↓ Bharat-300M ↓ Bharat-1B ↓ Bharat-3B ↓ Bharat-7B ↓ Bharat-14B ↓ Future Frontier Model

Also support branches:

Base Reasoning Vision Speech Multimodal Agent

This is a roadmap visualization, not a claim that these models currently exist.

================================================== 14. ROADMAP MODULE

Create a long-term research roadmap.

PHASE 0 Company + research infrastructure

PHASE 1 Learning + tiny Transformer

PHASE 2 Bharat-50M

PHASE 3 Bharat-100M

PHASE 4 Bharat-300M

PHASE 5 Bharat-1B

PHASE 6 Bharat-3B

PHASE 7 Bharat-7B+

PHASE 8 Reasoning

PHASE 9 Multimodal

PHASE 10 Speech

PHASE 11 Agents

PHASE 12 Frontier-scale training

Each phase must have:

objective

prerequisites

research questions

engineering requirements

data requirements

compute requirements

evaluation requirements

success criteria

risks

================================================== 15. SECURITY

Build security into the architecture from the beginning.

Include:

authentication

role-based access control

researcher roles

admin roles

audit logs

API key management

secrets management

model access control

dataset access control

experiment access control

immutable experiment records where possible

Never expose secrets in frontend code.

================================================== 16. TECHNICAL ARCHITECTURE

Use a modular architecture.

Frontend:

React + TypeScript.

Backend:

Create clean service interfaces that can later connect to Python services.

The frontend must NOT contain training logic.

Future backend services:

/data /training /models /evaluation /compute /experiments /inference /research

Database should be designed around versioned entities.

Important entities:

users teams projects models model_versions datasets dataset_versions experiments training_runs checkpoints benchmarks evaluations compute_nodes research_notes papers milestones audit_logs

================================================== 17. API-FIRST DESIGN

Do not build a frontend that becomes impossible to connect to a real ML backend.

Define clean interfaces.

Example:

GET /models GET /models/:id GET /experiments GET /experiments/:id GET /training/runs GET /datasets GET /benchmarks GET /evaluations GET /compute GET /research/projects

Future POST endpoints:

POST /experiments POST /training/runs POST /datasets POST /evaluations POST /models

For now, mock data is acceptable, but clearly isolate mock services from real services.

================================================== 18. NO FAKE AI

Never use fake AI language such as:

"Your AI is thinking..."

unless an actual model/backend is connected.

Never fabricate:

training progress

GPU utilization

benchmark scores

model performance

number of parameters

dataset size

research results

Use:

"Not connected" "Awaiting backend" "Research phase" "Placeholder"

where appropriate.

================================================== 19. FUTURE MODEL BACKEND

The architecture must eventually support a fully independent model stack:

DATA ↓ TOKENIZER ↓ MODEL ARCHITECTURE ↓ PRETRAINING ↓ CHECKPOINT ↓ POST-TRAINING ↓ EVALUATION ↓ INFERENCE ↓ PRODUCTS

The frontend should be completely agnostic to whether the backend uses one GPU, multiple GPUs, or a future large distributed cluster.

================================================== 20. DESIGN PHILOSOPHY

This should NOT look like a generic SaaS dashboard.

It should feel like:

"A serious frontier AI research laboratory's internal operating system."

Prioritize:

clarity

hierarchy

scientific rigor

traceability

reproducibility

versioning

observability

security

scalability

Do not add unnecessary social features.

Do not add generic CRM features.

Do not add irrelevant startup-dashboard widgets.

================================================== 21. INITIAL DELIVERABLE

Build the frontend prototype and architecture now.

Create:

Overview

Research

Models

Experiments

Training

Datasets

Evaluation

Compute

Infrastructure

Model Registry

Roadmap

Documentation

Team

Security

Settings

Use realistic placeholder data but clearly label it as DEMO/PLACEHOLDER.

Do not claim that any model has actually been trained.

The architecture should be designed so the placeholder layer can later be replaced by real backend APIs without rebuilding the frontend.

The most important principle:

THIS PLATFORM IS THE CONTROL CENTER FOR A FUTURE INDEPENDENT FRONTIER AI LAB.

It is not the AI model itself.

Build the first version cleanly and modularly.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/b6ba81ac-72a7-4305-8b74-ee24743e4cbe).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
