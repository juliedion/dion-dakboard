import {NextResponse} from 'next/server';
import ical from 'node-ical';
export const dynamic='force-dynamic';
export async function GET(){
 const urls=[process.env.CALENDAR_ICS_URL,process.env.CALENDAR_ICS_URL_2,process.env.CALENDAR_ICS_URL_3].filter(Boolean) as string[];
 if(!urls.length)return NextResponse.json({configured:false,events:[]});
 const events:any[]=[];
 await Promise.all(urls.map(async(url,i)=>{try{
 const res=await fetch(url,{cache:'no-store'});if(!res.ok)throw Error('Calendar unavailable');
 const parsed=ical.sync.parseICS(await res.text());
 const start=new Date();start.setDate(start.getDate()-1);const end=new Date();end.setDate(end.getDate()+15);
 for(const entry of Object.values(parsed) as any[]){if(entry.type!=='VEVENT')continue;
 const instances=entry.rrule?ical.expandRecurringEvent(entry,{from:start,to:end}):[{start:entry.start,end:entry.end}];
 for(const instance of instances){const date=new Date(instance.start);if(date>=start&&date<=end)events.push({id:`${i}-${entry.uid}-${date.toISOString()}`,title:entry.summary||'Untitled',start:date.toISOString(),end:instance.end?new Date(instance.end).toISOString():null,allDay:entry.datetype==='date',calendar:i});}
 }
 }catch(e){console.error('Calendar fetch error',i,e)}}));
 events.sort((a,b)=>a.start.localeCompare(b.start));return NextResponse.json({configured:true,events:events.slice(0,120)});
}
