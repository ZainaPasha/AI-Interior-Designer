import { Container } from "@/components/container";
import { CustomBreadCrumb } from "@/components/custom-breadcrumb";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Client } from "../_components/client";

const DashboardPage = async () => {
    const {userId} = await auth();
    if (!userId) redirect('/sign-in');
    const user = await currentUser();
    if (!user) redirect('/sign-in');
    const safeUser = {
        id: user.id,
        fullName: user.firstName + ' ' + user.lastName,
        email: user.emailAddresses[0]?.emailAddress,
        imageUrl: user.imageUrl,
    }
    return (<Container className="space-y-4 p-4 min-md:p-8">
        <CustomBreadCrumb breadCrumbItems={[{label:"Dashboard", link:"/dashboard"}]} breadCrumbPage="Overview"/>
        <Client user={safeUser} />
    </Container>);
}
 
export default DashboardPage;