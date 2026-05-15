import "../ui.css";

interface ProductInteractionPromptProps {
  productTitle: string | undefined;
  intersectedProductID: string;
}

const ProductInteractionPrompt = ({ productTitle, intersectedProductID }: ProductInteractionPromptProps) => {
  return (
    <div className="model-interaction-prompt">
      {intersectedProductID === "decoration" ? "Coming soon" : productTitle}
    </div>
  );
};

export default ProductInteractionPrompt;
