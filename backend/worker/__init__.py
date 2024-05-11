import tempfile
import docker
from celery import Celery
from celery.exceptions import TimeLimitExceeded

from core.config import config

celery_app = Celery(
    "worker",
    backend=config.CELERY_BACKEND_URL,
    broker=config.CELERY_BROKER_URL,
)

# celery_app.conf.task_routes = {"worker.celery_worker.test_celery": "test-queue"}
celery_app.conf.update(task_track_started=True)


@celery_app.task
def run_sandboxed(code: str, cases) -> dict:
    inputs = [case['content'] for case in cases] 
    outputs = [case["answer"] for case in cases]
    try:
        client = docker.from_env()
        print("Running ", code)
        
        with tempfile.NamedTemporaryFile() as ifp:
            with tempfile.NamedTemporaryFile() as fp:
                with open(ifp.name, 'w') as f:
                    f.write('\n'.join(inputs))
                with open(fp.name, 'w') as f:
                    f.write(code)

                stdout = client.containers.run(
                    image='python:3.10-alpine',
                    name='sandbox_container',
                    volumes={
                        fp.name: {
                            'bind': '/tmp/code.py',
                            'mode': 'ro',
                        },
                        ifp.name: {
                            'bind': '/tmp/input.txt',
                            'mode': 'ro',
                        }
                    },
                    network='none',
                    remove=True,
                    stderr=True,
                    command='python3 /tmp/code.py < /tmp/input.txt'
                    # command='ls /tmp/'
                )

                result = stdout.decode()
                case_results = result.split('\n')[:-1]
                print(f"Testing {case_results} againsts {outputs}")

                return case_results == outputs
    except TimeLimitExceeded as e:
        return {
            "time_exceeded": True
        }