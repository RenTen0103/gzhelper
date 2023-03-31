import React, {useEffect, useState} from "react";
import {schedule} from "../types/schedule";
import {getScheduleListFromStore, setScheduleList, userStore} from "../stores/user-store";
import {timeStore} from "../stores/time-store";
import {VStack} from "native-base";
import ShceduleSingle from "./shcedule-single";

export default function () {
    const [scheduleList, setSchedule] = useState<schedule[]>([])

    const [current, setCurrent] = useState<number>(0)


    function getWeek() {

        let date = new Date();

        let startData = timeStore.getState().value;

        return Math.floor((Math.floor((date.valueOf() - startData) / (24 * 60 * 60 * 1000)) + 1) / 7)

    }


    const init = () => {
        try {
            let totalSchedule = JSON.parse(userStore.getState().scheduleList) as schedule[][][];
            let scheduleToady: schedule[] = []
            let week = new Date().getDay();
            totalSchedule.forEach(e => {
                let r = e[week - 1].find(e => {
                    let k = true
                    if (e.timeInfo?.includes("单周")) {
                        if (current % 2 == 1) {
                            k = true
                        }
                    }
                    if (e.timeInfo?.includes("双周")) {
                        if (current % 2 == 1) {
                            k = false
                        }
                    }
                    return e.startWeek <= current && e.endWeek >= current && k
                })

                if (r == undefined) {
                    scheduleToady.push({endWeek: 0, lesson: "", location: "", single: 0, startWeek: 0, teacher: ""})
                } else scheduleToady.push(r)
            })
            setSchedule(scheduleToady)
        } catch (e) {
            console.log(e)
        }
    }


    useEffect(() => {
        setCurrent(getWeek())
        setScheduleList(getScheduleListFromStore())
        userStore.subscribe(() => {
            setScheduleList(getScheduleListFromStore)
            init()
        })
        timeStore.subscribe(() => {
            setCurrent((getWeek()))
            init()
        })
        init()
    }, [current])

    return <VStack h={"full"}>
        {scheduleList.map((value, index) => {
            return <ShceduleSingle index={index} key={index} scheduleData={value}></ShceduleSingle>
        })}
    </VStack>
}

