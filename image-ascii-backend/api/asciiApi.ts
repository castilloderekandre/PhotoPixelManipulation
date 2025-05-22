import type {Request} from "express"

/** Models the JSON Request body for the image generator. */
type ImageGenerationRequestBody = {
    image: string
}

/** Models a request for an ASCii image. */
export type ImageGenerationRequest = Request<{}, {}, ImageGenerationRequestBody>