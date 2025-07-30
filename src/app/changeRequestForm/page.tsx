'use client'

import { Button } from "@/components/ui/button"
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

const changeRequestForm = () => {
    const searchParams = useSearchParams();
    const personId = searchParams.get("personId");

    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const { data: adminPhone } = useSWR(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/user`,
        fetcher
    );

    return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-md mx-auto mt-8 p-10 bg-card rounded-lg shadow-md">
            <div className="flex items-center justify-center w-full">
                <h1 className="text-2xl text-card-foreground font-bold pb-8">اختر لطلب التعديل</h1>
            </div>
                <Button 
                    className="w-full py-2 px-4 font-semibold rounded-md transition mb-2"
                    onClick={() => window.location.href = `/changeRequestForm/editPerson?personId=${personId}`}
                >
                    تعديل المعلومات الشخصية
                </Button>
                <Button 
                    className="w-full py-2 px-4 font-semibold rounded-md transition mb-2 "
                    onClick={() => window.location.href = `/changeRequestForm/addChild?parentId=${personId}`}
                >
                    إضافة ابن
                </Button>
                <Button 
                    className="w-full py-2 px-4 font-semibold rounded-md transition mb-2"
                    onClick={() => window.location.href = `/changeRequestForm/addSpouseRelationship?personId=${personId}`}
                >
                    إضافة زوج
                </Button>
                <Button 
                    className="w-full py-2 px-4 font-semibold rounded-md transition mb-2"
                    onClick={() => window.location.href = `https://wa.me/${adminPhone}`}
                >
                    تواصل معنا عبر الواتساب
                </Button>
            </div>
        </div>
    )
}

export default changeRequestForm;