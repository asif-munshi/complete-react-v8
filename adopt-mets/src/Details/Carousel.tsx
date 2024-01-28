import { Component, MouseEvent } from "react";

interface IProps {
  images: string[];
}

class Carousel extends Component<IProps> {
  state = {
    active: 0,
  };

  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  handleIndexClick = (event: MouseEvent<HTMLElement>) => {
    if (!(event.target instanceof HTMLElement)) {
      return;
    }

    if (event.target.dataset.index) {
      this.setState({
        active: +event.target.dataset.index,
      });
    }
  };

  render() {
    const { active } = this.state;
    const { images } = this.props;
    return (
      <div className="mt-2 flex h-[400px] items-center justify-around">
        <img
          src={images[active]}
          alt="animal"
          className="max-h-[400px] max-w-[45%]"
        />
        <div className="w-[50%]">
          {images.map((photo, index) => (
            // eslint-disable-next-line
            <img
              onClick={this.handleIndexClick}
              data-index={index}
              key={photo}
              src={photo}
              className={
                index === active
                  ? "m-[15px] inline-block h-[100px] w-[100px] cursor-pointer rounded-[50%] border border-[#333] opacity-60"
                  : "m-[15px] inline-block h-[100px] w-[100px] cursor-pointer rounded-[50%] border-[2px] border-[#333]"
              }
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
