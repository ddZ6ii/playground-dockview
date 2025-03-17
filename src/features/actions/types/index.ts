export type Action = {
  id: string
  title: string
  createdAt: string
}

export type FormState = {
  data: {
    action: string
  }
  error: {
    action: string[]
  }
  status: FormStatus
}

export type FormStatus = "typing" | "submitting"
