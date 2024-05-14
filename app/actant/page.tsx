import Navigation from "../component/Navigation";
import { getActants } from "@/sanity/sanity-utils";
import { Actant as ActantType } from "@/types/Actant";
import Actant from "../component/Actant";

const DisplayActants = async () => {
  let actants = null;
  actants = await getActants();

  return (
    <>
      <Navigation
        left="Back"
        title="Actant"
        right="Log Out"
        myStyle={{}}
      ></Navigation>
      <main className="allactant">
        <h1>All Actants in the network</h1>
        <p>These are all the actants in the network.</p>
        <div className="actants_scroller">
          hello {actants.length}
          {actants.map((actant: ActantType) => (
            <Actant
              key={actant.name}
              showName={true}
              name={actant.name ? actant.name : ""}
              imageSrc={actant.image ? actant.image + "" : "/rainbow-trout.jpg"}
            />
          ))}
        </div>
        <form action="/actant/new">
          <button className="button primary">Recognise a New Actant</button>
        </form>
        <form action="/actant/update">
          <button className="button primary">Update or Remove an Actant</button>
        </form>
      </main>
    </>
  );
};

export default DisplayActants;
