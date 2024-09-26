// Carousel.tsx
"use client";
import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

// Define the props type if you want to pass items or any other props
interface CarouselProps {
  items: any[];
}

const Carousel: React.FC<CarouselProps> = (props: CarouselProps) => (
  <AliceCarousel
    autoPlay
    autoPlayControls
    autoPlayStrategy="none"
    autoPlayInterval={1000}
    animationDuration={1000}
    animationType="fadeout"
    infinite
    touchTracking={false}
    disableDotsControls
    disableButtonsControls
    items={props.items}
  />
);

export default Carousel;
