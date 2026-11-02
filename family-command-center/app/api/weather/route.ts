import {NextResponse} from 'next/server';
export const revalidate = 1800;
export async function GET(){try{
 const lat=process.env.WEATHER_LAT||'42.8142', lon=process.env.WEATHER_LON||'-73.9396';
 const url=`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,apparent_temperature&daily=weather_code,temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&timezone=America%2FNew_York&forecast_days=7`;
 const r=await fetch(url,{next:{revalidate:1800}});if(!r.ok)throw Error('weather');return NextResponse.json(await r.json());
}catch{return NextResponse.json({error:'Weather temporarily unavailable'},{status:503})}}
