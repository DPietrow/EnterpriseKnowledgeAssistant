# services/job_store.py

import threading

class JobStore:

    _jobs = {}
    _lock = threading.Lock()

    @classmethod
    def create(cls, job_id):
        with cls._lock:
            cls._jobs[job_id] = {
                "stage": "created",
                "progress": 0,
                "error": None
            }

    @classmethod
    def update(cls, job_id, stage=None, progress=None, error=None):
        with cls._lock:
            job = cls._jobs.get(job_id, {})
            if stage:
                job["stage"] = stage
            if progress is not None:
                job["progress"] = progress
            if error:
                job["error"] = error

    @classmethod
    def get(cls, job_id):
        return cls._jobs.get(job_id, None)