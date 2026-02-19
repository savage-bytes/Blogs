from django.contrib import messages
from django.shortcuts import render

from .forms import ContactForm


def _portfolio_context():
    skills = [
        {
            "group": "Programming",
            "items": [
                {"name": "C++", "level": 88},
                {"name": "C#", "level": 85},
                {"name": "Python", "level": 82},
            ],
        },
        {
            "group": "Game Engines",
            "items": [
                {"name": "Unity", "level": 86},
                {"name": "Unreal Engine", "level": 68},
            ],
        },
        {
            "group": "Web",
            "items": [
                {"name": "Django", "level": 80},
                {"name": "HTML", "level": 84},
                {"name": "CSS", "level": 78},
                {"name": "JavaScript", "level": 72},
            ],
        },
        {
            "group": "Creative Tools",
            "items": [
                {"name": "Premiere Pro", "level": 70},
                {"name": "After Effects", "level": 60},
                {"name": "DaVinci Resolve", "level": 74},
            ],
        },
    ]

    projects = [
        {
            "title": "Flappy Bird Clone",
            "description": "Arcade recreation with tight physics, score loops, and polished feel.",
            "tech": ["Unity", "C#"],
            "status": "Completed",
            "github": "",
        },
        {
            "title": "FPS Game",
            "description": "Solo FPS prototype exploring AI behavior, weapon feel, and level flow.",
            "tech": ["Unity", "C#"],
            "status": "In Progress",
            "github": "",
        },
        {
            "title": "Password Manager",
            "description": "Secure vault with CRUD operations, search, and authentication flows.",
            "tech": ["Django", "SQLite"],
            "status": "Completed",
            "github": "",
        },
        {
            "title": "Blogging Platform",
            "description": "Full CRUD blogging system with media uploads and custom styling.",
            "tech": ["Django", "HTML", "CSS"],
            "status": "Completed",
            "github": "",
        },
        {
            "title": "Chat Application",
            "description": "Realtime-inspired chat UX with users, threads, and clean UI.",
            "tech": ["Django", "JavaScript"],
            "status": "Completed",
            "github": "",
        },
    ]

    experience = [
        {
            "title": "Software Developer Intern",
            "company": "CODINWALK SOFTWARE PVT. LTD.",
            "focus": "Agentic AI & LLM systems",
            "details": [
                "Designed API workflows with performance and reliability in mind.",
                "Optimized request latency and tuned response payloads.",
                "Collaborated in a fast-moving team using best practices.",
            ],
        }
    ]

    return {
        "hero_roles": ["Game Developer", "Software Engineer", "Unity Developer"],
        "skills": skills,
        "projects": projects,
        "experience": experience,
    }


def home(request):
    context = _portfolio_context()
    return render(request, "portfolio/home.html", context)


def about(request):
    return render(request, "portfolio/about.html", _portfolio_context())


def skills(request):
    return render(request, "portfolio/skills.html", _portfolio_context())


def projects(request):
    return render(request, "portfolio/projects.html", _portfolio_context())


def experience(request):
    return render(request, "portfolio/experience.html", _portfolio_context())


def contact(request):
    context = _portfolio_context()
    submitted = False

    if request.method == "POST":
        form = ContactForm(request.POST)
        if form.is_valid():
            submitted = True
            messages.success(request, "Message received. I will get back to you soon.")
            form = ContactForm()
    else:
        form = ContactForm()

    context.update({"form": form, "submitted": submitted})
    return render(request, "portfolio/contact.html", context)
