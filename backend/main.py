from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.example import router as example_router

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://ekkee.vercel.app"],  # Add your frontend URLs here
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(example_router, prefix="/api/v1")

@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI backend!"} 