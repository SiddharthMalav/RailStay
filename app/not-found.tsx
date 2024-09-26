/**
 * Renders a 404 error page with a descriptive message and an image.
 * Informs the user that the page they are looking for is not available.
 */

import Image from "next/image";
const Error404 = () => {
  return (
    <div>
      <div className="text-center">
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/assets/images/404.svg"
            alt="404 - Page not found"
            width={500}
            height={300}
          />
          <h2>404 - PAGE NOT FOUND</h2>
          <p className="p404">
            The page you are looking for might have been removed had its name
            changed or is temporarily unavailable.
          </p>
          {/* {renderButton()} */}
        </div>
      </div>
    </div>
  );
};
export default Error404;
