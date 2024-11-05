/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FRONTEND_PORT: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}