declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number
      SECRET: string
      HOST: string
    }
  }
}

export {};
