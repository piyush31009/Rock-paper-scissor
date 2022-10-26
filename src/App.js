import { Component } from "react";
import "./App.css";
import Nabvar from "./components/navbar";
const WhoIsBig = (First, Second) => {
  if (First === Second) {
    return "Tie";
  }
  switch (First) {
    case "Rock":
      if (Second === "Scissors") {
        return First;
      } else {
        return Second;
      }
    case "Paper":
      if (Second === "Rock") {
        return First;
      } else {
        return Second;
      }
    case "Scissors":
      if (Second === "Paper") {
        return First;
      } else {
        return Second;
      }
    default:
  }
};

class App extends Component {
  state = {
    Started: false,
    Player: null,
    Computer: null,
    Name: ""
  };
  render() {
    const { Started, Player, Computer, Name } = this.state;
    const Images = {
      Rock: "https://i.imgur.com/TONXH9s.png",
      Paper: "https://i.imgur.com/t2154qR.png",
      Scissors: "https://i.imgur.com/SXstPKk.png"
    };
    return (
      <div className="App">
        <Nabvar/>
        {Started ? (
          <div className="Game">
            <div className={"Player" + (Player ? " selected" : "")}>
              <p>{Name}</p>
              {Player ? (
                <img src={Images[Player]} alt={Player} />
              ) : (
                <div className="choose">
                  {Object.keys(Images).map((a) => (
                    <span
                      key={a}
                      onClick={() => {
                        this.setState({
                          Player: a,
                          Computer: Object.keys(Images)[
                            Math.floor(
                              Math.random() * Object.keys(Images).length
                            )
                          ]
                        });
                      }}
                    >
                      <img src={Images[a]} alt={a} />
                      {a}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="Computer">
              <p>Computer</p>
              {Computer ? (
                <img src={Images[Computer]} alt={Computer} />
              ) : (
                <img src="https://i.imgur.com/CyvHqQH.png" alt="All Choices" />
              )}
            </div>
          </div>
        ) : (

          <div className="Intro">
            &nbsp;
            <input
              type="text"
              placeholder="Enter your name, at least 5 characters long..."
              value={Name}
              onChange={(e) => {
                this.setState({ Name: e.target.value });
              }}
            />
            {Name.trim().length >= 5 && (
              <img
                className="start"
                src="https://th.bing.com/th/id/R.2ae465d1837d010046e3de3bd6f53aa6?rik=EKJBjmnGS3rnnQ&riu=http%3a%2f%2f4.bp.blogspot.com%2f-z0j1yLnIkNI%2fVA_mVyyvvpI%2fAAAAAAAAAAw%2fCC0w8pUxjl0%2fs1600%2fbutton.png&ehk=EIRoAfpd8VXJjXBcSzViGDiDMzyp1opQ9w2t%2fzT7edI%3d&risl=&pid=ImgRaw&r=0"
                alt="Start"
                onClick={() => {
                  this.setState({
                    Started: true
                  });
                }}
              />
            )}
          </div>
        )}
        {Player && Computer && (
          <p className="Results">
            {(() => {
              const Winner = WhoIsBig(Player, Computer);
              if (Winner === "Tie") {
                return "Nobody Wins!";
              } else {
                if (Winner === Player) {
                  return Name + " Wins!";
                } else {
                  return "Computer Wins!";
                }
              }
            })()}
            <img
              src="https://i.imgur.com/529CybI.png"
              alt="Restart"
              onClick={() => {
                this.setState({
                  Started: false,
                  Player: null,
                  Computer: null
                });
              }}
            />
          </p>
        )}
      </div>
    );
  }
}

export default App;
