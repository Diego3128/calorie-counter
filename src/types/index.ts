export type Category = {
    id: number
    type: string
}

export type Activity = {
    id: string
    category: number
    type: string
    calories: number
}