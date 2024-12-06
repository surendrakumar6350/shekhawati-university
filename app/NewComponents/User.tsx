"use client";
import React, { SyntheticEvent, useState } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { allSearchJs } from "@/apiCalls/allApiCalls";

function convertDate(isoDate: any) {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return `${year}-${padZero(month + 1)}-${padZero(day)}`;
  function padZero(value: any) {
    return (value < 10 ? "0" : "") + value;
  }
}

const User = (props: any) => {
  const { user } = props;
  const [expandedUsers, setExpandedUsers] = React.useState<string[]>([]);
  const [searchedProfile, setSearchedProfile] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleUserExpansion = async (userId: string) => {
    setLoading(true);
    const data = await allSearchJs({ userId: user._id });
    if(!data?.success) {
      setLoading(false);
      return;
    }
    setSearchedProfile(data?.find);
    setLoading(false);
    setExpandedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId],
    );
  };

  return (
    <>
      <Card key={user._id} className="overflow-hidden">
        <CardHeader
          className="cursor-pointer"
          onClick={() => toggleUserExpansion(user._id)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={user.picture} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">{user.name}</CardTitle>
                <p className="text-sm text-gray-500">
                  Searched {user.count} Profiles
                </p>
              </div>
            </div>
            {loading == true && (
              <img src="/loading.gif" className="w-6 h-6 rounded" />
            )}
            {expandedUsers?.includes(user?.id) ? (
              <>{loading == false && <ChevronUp className="h-5 w-5" />}</>
            ) : (
              <>{loading == false && <ChevronDown className="h-5 w-5" />}</>
            )}
          </div>
        </CardHeader>
        {expandedUsers?.includes(user?._id) && (
          <CardContent>
            <div className="container mx-auto p-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {searchedProfile?.map((post: any) => (
                  <div className="flex items-center gap-3">
                    <CardContent className="p-4 pt-0">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img
                            src={
                              post.search?.imgSrc == "/placeholder.svg"
                                ? "/placeholder.svg"
                                : `https://shekhawati-kaa-data.online/api/getimage?imgSrc=${post.search?.imgSrc}`
                            }
                            alt=""
                            className="w-12 h-12 object-cover rounded-full"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "/placeholder.svg";
                          }}
                          />
                          <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full p-1">
                            <Search className="w-3 h-3" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-muted-foreground">
                            Searched for this profile
                          </p>
                          <p className="text-sm font-medium truncate">
                            {post.search?.studentName}
                          </p>
                          <p className="text-xs font-semibold truncate">
                            {convertDate(post.date)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </>
  );
};

export default User;
