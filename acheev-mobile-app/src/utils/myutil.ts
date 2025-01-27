import { Dimensions } from "react-native"

const { width, height, scale } = Dimensions.get("window")


const checkIfWorkoutCompleted = (workouts: any[], id: number) => {
    const exists = workouts?.find((x) => x.id == id)
    return exists ? true : false
}

const getFontSize = (size: number) => {
    return width * (size / 100)
}

const WIDTH = width
const HEIGHT = height

export {
    checkIfWorkoutCompleted,
    getFontSize,
    WIDTH,
    HEIGHT
}