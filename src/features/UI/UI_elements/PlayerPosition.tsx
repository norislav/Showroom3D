import "./playercommands.css";

const PlayerPosition = () => {
  return (
    <div id="container">
      <h2 id="command-title">Commands</h2>
      <hr id="separator" />
      <p className="command-line"><span className="highlight">W,A,S,D</span> or directional keys to move</p>
      <p className="command-line"><span className="highlight">SPACEBAR</span> to jump</p>
      <p className="command-line"><span className="highlight">LEFT CLICK</span> to interact with products</p>
      <p className="command-line"><span className="highlight">ESC</span> to interact with the cart</p>
      <p className="command-line"><span className="highlight">F</span> for the flashlight</p>
    </div>
  );
};

export default PlayerPosition;
