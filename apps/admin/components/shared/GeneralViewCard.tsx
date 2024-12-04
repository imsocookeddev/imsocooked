import Link from "next/link";
import { Card, CardHeader, CardContent, CardDescription } from "../ui/card";
import Image from "next/image";
type GeneralViewcardProps = {
  name:string,
  id:string,
  imgUrl?:string
}
export default async function GeneralViewCard(props:GeneralViewcardProps){
  const { name, id, imgUrl} = props;
  return (
    <Link
      href={`/cuisines/${id}`}
      className="w-full h-full">
      <Card className="space-y-3 h-full">
        <CardHeader>
          <p className="w-full text-end text-xs">{id}</p>
        </CardHeader>
        <CardContent>
          {imgUrl && (
            <CardDescription className="text-3xl flex flex-row justify-between">
            <Image
              src={imgUrl}
              alt={name}
              width={50}
              height={50}
              className="rounded-full"
            />
            {name}
          </CardDescription>)}
        </CardContent>
      </Card>
    </Link>
  );
}