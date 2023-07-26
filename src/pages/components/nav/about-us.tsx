import Image from "next/image";

const AboutUs = () => {
  return (
    <div className="container mx-auto my-10">
      <div className="grid grid-flow-col"> 
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris in lacus
          feugiat, porttitor purus et, hendrerit enim. In elit dolor, porta a
          volutpat nec, tincidunt nec enim. Sed volutpat id nunc sit amet
          hendrerit. Nullam nec vulputate felis, vitae consectetur tortor.
          Praesent malesuada ipsum ut massa rhoncus vulputate. Nunc cursus libero
          elit, ac facilisis ante egestas eu. Phasellus ipsum eros, aliquet non
          tempor consectetur, pulvinar a mauris. Praesent quis odio dolor. Aenean
          sit amet sollicitudin felis. In in ultrices justo. Sed velit ipsum,
          rhoncus at fringilla a, blandit at leo. Praesent tristique rutrum
          porttitor. Suspendisse potenti. Phasellus sed nibh at elit facilisis
          pulvinar. Duis quis dolor vel nisi tempor consequat. Praesent neque
          nunc, dignissim id molestie non, molestie varius nunc. In dolor augue,
          auctor quis nisi et, vehicula congue arcu. Class aptent taciti sociosqu
          ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas
          vitae rhoncus tortor, molestie bibendum elit. Vestibulum vulputate urna
          at neque ullamcorper, quis scelerisque odio tempor. Ut eleifend, diam eu
          sollicitudin eleifend, magna augue tempus nibh, sit amet scelerisque
          erat dui a nibh. Praesent consectetur, felis at tincidunt maximus, est
          erat maximus eros, at posuere libero ante non justo. Aenean eu tortor et
          felis feugiat laoreet a ac nulla. Vestibulum vitae fermentum ipsum. Sed
          dignissim vehicula est in dictum. Aliquam enim nibh, congue vitae diam
          nec, lacinia sollicitudin erat. Praesent aliquet non purus at facilisis.
          Etiam ornare posuere condimentum. Praesent ut iaculis est.
        </p>

        <Image width={400} height={400} alt="box-logo" src="/assets/box-logo.png" />
      </div>
    </div>
  );
};
export default AboutUs;
