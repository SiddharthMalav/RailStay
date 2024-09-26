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
    autoPlayStrategy="none"
    autoPlayInterval={2000}
    animationDuration={800}
    animationType="slide"
    infinite
    touchTracking={false}
    disableDotsControls
    disableButtonsControls
    items={props.items}
  />
);

export default Carousel;
