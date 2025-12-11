import CryptoList from "@/components/crypto-list/CryptoList";
import Section from "@/modules/section/Section";
import PrivateRoute from "@/shared/private-route/PrivateRoute";

export default function Backpack() {
  return (
    <PrivateRoute>
      <Section>
        <CryptoList />
      </Section>
    </PrivateRoute>
  );
}
