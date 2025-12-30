"use client";

import { useState, useEffect } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import { useSearchStore } from "@/shared/store/searchStore";
import httpService from "@/shared/services/http.service";
import { NotificationService } from "@/shared/services/notification.service";
import { ParkingLot } from "@/shared/types/types";
import ParkingLotCard from "../components/ParkingLotCard";

export default function SearchPage() {
  const [parkingLotList, setParkingLotList] = useState<ParkingLot[]>([]);
  const [selectedParkingLot, setSelectedParkingLot] =
    useState<ParkingLot | null>(null);
  const searchData = useSearchStore((state) => state.searchData);

  useEffect(() => {
    if (searchData) {
      getParkingLots(searchData);
    }
  }, [searchData]);

  const getParkingLots = async (data: any) => {
    try {
      const response = await httpService.post("search", data);
      const lots = response.data.data || response.data;
      setParkingLotList(lots);
    } catch (error) {
      NotificationService.showError("Failed to load Parking Lots.");
    }
  };

  return (
    <>
      <Header />
      <SearchBar />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Available Parking Lots</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {parkingLotList.map((lot) => (
            <ParkingLotCard
              key={lot.id}
              parkingLot={lot}
              onClick={() => setSelectedParkingLot(lot)}
            />
          ))}
        </div>
        {parkingLotList.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No parking lots found. Try adjusting your search criteria.
          </div>
        )}
      </div>
    </>
  );
}
