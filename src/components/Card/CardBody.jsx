import React from 'react'
import defaultImage from "../../assets/images/defaultImage.jpg";
export default function CardBody({post}) {
    const { body, image } = post || {};
  return (
    <>
            <div className="mt-3">
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
            {body}
          </p>

          {image && (
            <img
              src={image || defaultImage}
              alt="post"
              className="mt-2 w-full max-h-[400px] object-cover rounded-md"
            />
          )}
        </div>
    </>
  )
}
