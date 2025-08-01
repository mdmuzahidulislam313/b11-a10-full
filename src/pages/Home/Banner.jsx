import { Fade } from "react-awesome-reveal";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Banner() {
  const slides = [
    {
      id: 1,
      title: "Find Your People",
      subtitle: "Join local hobby groups and meet new friends who share your interests.",
      img: "",
      btnText: "Find Groups",
      btnLink: "/groups"
    },
    {
      id: 2,
      title: "Create Your Own Club",
      subtitle: "Start a group for any passion you love and build a community around it.",
      img: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
      btnText: "Start a Group",
      btnLink: "/createGroup"
    },
    {
      id: 3,
      title: "Level Up Your Skills",
      subtitle: "Attend weekly sessions and improve together with like-minded enthusiasts.",
      img: "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1970&q=80",
      btnText: "Explore Activities",
      btnLink: "/groups"
    },
  ];

  return (
    <div className="w-full carousel">
      {slides.map((slide) => (
        <div
          key={slide.id}
          className="carousel-item w-full relative h-[70vh] bg-cover bg-center"
          style={{ backgroundImage: `url(${slide.img})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50 flex flex-col items-center justify-center text-center text-white px-4">
            <div className="max-w-4xl">
              <Fade cascade damping={0.2}>
                <h2 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
                  {slide.subtitle}
                </p>
                <div>
                  <Link
                    to={slide.btnLink}
                    className="inline-flex items-center px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all transform hover:scale-105 font-medium text-lg gap-2"
                  >
                    {slide.btnText}
                    <FaArrowRight />
                  </Link>
                </div>
              </Fade>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
