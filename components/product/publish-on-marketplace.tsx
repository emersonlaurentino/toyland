import Button from "@/components/ui/button";
import { router } from "expo-router";

type Props = {
  id: string;
};

export default function PublishOnMarketplace(props: Props) {
  return (
    <Button
      variant="outline"
      onPress={() =>
        router.push({
          pathname: "/marketplace/new",
          params: { productId: props.id },
        })
      }
    >
      Desapegar
    </Button>
  );
}
