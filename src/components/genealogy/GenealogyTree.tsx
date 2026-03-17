import { type UserDataResponse } from "../../features/auth/useUserData";
import { TransformComponent } from "react-zoom-pan-pinch";
import { GenealogyNode } from "./GenealogyNode";

interface GenealogyTreeProps {
  userData?: UserDataResponse;
}

export function GenealogyTree({ userData }: GenealogyTreeProps) {
  if (!userData) return null;

  const root = userData["user data"];
  const profile = userData.profile;

  return (
    <div className="bg-[#f8fafc] rounded-[3rem] p-4 h-full border border-slate-200/60 shadow-inner flex flex-col overflow-auto">
      <TransformComponent
        wrapperStyle={{ width: "100%", height: "100%", flex: 1 }}
        contentStyle={{
          width: "100%",
          minHeight: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "300px 200px",
        }}
      >
        <GenealogyNode
          userId={root.id}
          idCode={root.id_code}
          fullName={
            root.first_name
              ? `${root.first_name} ${root.last_name || ""}`.trim()
              : root.username
          }
          userImage={root.image}
          rankName={null} // Rank isn't available in root profile response directly in same format
          subscriptionName={profile.subscription}
          color="red"
          isRoot={true}
        />
      </TransformComponent>
    </div>
  );
}
