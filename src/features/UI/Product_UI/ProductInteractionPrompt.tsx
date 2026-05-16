import "../ui.css";

interface ProductInteractionPromptProps {
  productTitle: string | undefined;
  intersectedProductID: string;
}

const ProductInteractionPrompt = ({ productTitle, intersectedProductID }: ProductInteractionPromptProps) => {
  if (intersectedProductID === "decoration") {
    return (
      <div className="model-interaction-prompt">
        Coming soon
      </div>
    );
  }

  return (
    <div className="model-interaction-prompt">
      <span className="prompt-key">CLICK</span>
      {productTitle}
    </div>
  );
};

export default ProductInteractionPrompt;
