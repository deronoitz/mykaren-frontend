import { useEffect } from "react";

import BagLayout from "components/Layout/BagLayout";
import Bag from "components/scenes/Bag";
import Context from "hooks/bag";

export default function BagPage() {
  useEffect(() => {
    document.title = "Bag | MyKaren";
  });

  return (
    <Context.Provider>
      <BagLayout>
        <Bag />
      </BagLayout>
    </Context.Provider>
  );
}
