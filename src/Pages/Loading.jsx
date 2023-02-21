const Loading = () => {
  console.log("loading");
  return (
    <div className="lds-facebook">
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loading;

// function sleep(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

// await sleep(5000);
