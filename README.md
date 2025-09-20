# 🏡 AI Interior Designer (ControlNet + Depth)

An AI-powered interior redesign tool that transforms uploaded room photos into visually realistic, style-driven redesigns. Built using **Stable Diffusion + ControlNet Depth Conditioning**, the app lets users upload their space, enter a design style prompt (e.g., *modern Japanese living room*), and instantly generate redesigned outputs with spatial awareness.

---

## 🚀 Features

* Upload any room photo and generate redesigned versions.
* Style-driven customization powered by **Stable Diffusion**.
* **Depth estimation** ensures designs fit the space realistically.
* Interactive frontend with **Next.js, React, and shadcn/ui**.
* Smooth animations using **Framer Motion**.
* Cloud storage for images with **Cloudinary**.
* Database management with **NeonDB (PostgreSQL)** + **Prisma ORM**.
* Authentication handled with **Clerk**.

---

## 🛠️ Tech Stack

### **Frontend**

* ⚛️ [React.js](https://react.dev/)
* ▲ [Next.js](https://nextjs.org/)
* 🎨 [TailwindCSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
* ✨ [Framer Motion](https://www.framer.com/motion/)

### **Backend & AI**

* 🟢 [Node.js](https://nodejs.org/)
* 🔶 [PyTorch](https://pytorch.org/)
* 🧠 [Stable Diffusion v1.5](https://huggingface.co/runwayml/stable-diffusion-v1-5)
* 🕹️ [ControlNet (Depth)](https://huggingface.co/lllyasviel/sd-controlnet-depth)
* 🔍 [DPT Depth Estimation](https://huggingface.co/Intel/dpt-hybrid-midas)

### **Database & Storage**

* 🐘 [PostgreSQL (NeonDB)](https://neon.tech/)
* 🔗 [Prisma](https://www.prisma.io/)
* ☁️ [Cloudinary](https://cloudinary.com/)

### **Other Tools**

* 🔑 [Clerk Auth](https://clerk.com/)
* ⚡ [Vercel](https://vercel.com/) (Deployment)

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/ZainaPasha/AI-Interior-Designer.git
cd AI-Interior-Designer
```

### 2. Install Dependencies

```bash
# For frontend (Next.js)
npm install

# For backend (Python AI pipeline)
pip install -r requirements.txt
```

### 3. Environment Variables

Create a `.env.local` file in the root with:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
DATABASE_URL=your_neondb_postgres_url
CLOUDINARY_URL=your_cloudinary_url
```

### 4. Run the Development Servers

#### Run Next.js (Frontend)

```bash
npm run dev
```

#### Run Python Backend (AI Service)

```bash
python app.py
```

---

## 📦 Requirements

* **Node.js** >= 18
* **Python** >= 3.9
* CUDA-enabled GPU (recommended for faster inference with PyTorch)

---

## 🖼️ Example Usage

You can try the model in two ways:  
1. **Web App:** [AI Interior Designer](https://ai-interior-designer-sable.vercel.app/)  
2. **Hugging Face Space:** [AI Model](https://huggingface.co/spaces/ZainaPasha/ai-interior-designer)

Upload your room image, enter a style prompt, and get a redesigned interior image instantly.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, open an issue first to discuss what you’d like to improve.

---

⚡ Built with ❤️ by [Zaina Pasha](https://github.com/ZainaPasha)
