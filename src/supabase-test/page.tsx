import { supabase } from "@/lib/supabase";

export default async function SupabaseTestPage() {
  // ตัวอย่างการเรียกใช้งาน Supabase เบื้องต้น
  // ทดสอบเรียก getSession() เพื่อดูว่าเชื่อมต่อกับ Supabase สำเร็จหรือไม่
  const { data, error } = await supabase.auth.getSession();

  /*
   ตัวอย่างคำสั่งอื่นๆ ที่ใช้บ่อย:
   
   1. ดึงข้อมูล (Select):
   const { data: users, error } = await supabase.from('users').select('*');
   
   2. เพิ่มข้อมูล (Insert):
   const { data, error } = await supabase.from('users').insert([{ name: 'John' }]);
   
   3. อัปเดตข้อมูล (Update):
   const { data, error } = await supabase.from('users').update({ name: 'Jane' }).eq('id', 1);
  */

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 p-8 text-zinc-900 dark:text-zinc-100 font-sans">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Supabase Connection Test</h1>
        
        <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg mb-6 shadow">
          <h2 className="text-xl font-semibold mb-2">สถานะการเชื่อมต่อ (Config)</h2>
          <p><strong>URL:</strong> {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ ตั้งค่าแล้ว' : '❌ ยังไม่พบ URL'}</p>
          <p className="mt-1 text-sm text-zinc-500">{process.env.NEXT_PUBLIC_SUPABASE_URL}</p>
        </div>

        <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">ผลลัพธ์การทดสอบ (Auth Session)</h2>
          {error ? (
            <div className="text-red-500">
              เกิดข้อผิดพลาด: {error.message}
            </div>
          ) : (
            <div>
              <p className="text-green-500 font-medium mb-4">✅ เชื่อมต่อ Supabase สำเร็จ!</p>
              <pre className="bg-zinc-200 dark:bg-zinc-950 p-4 rounded overflow-auto text-sm">
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          )}
        </div>
        
        <div className="mt-8 p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">วิธีใช้งานเบื้องต้น</h2>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>import <code>supabase</code> จาก <code>@/app/lib/supabase</code></li>
            <li>ใช้ <code>supabase.from('table_name').select('*')</code> เพื่อดึงข้อมูล</li>
            <li>ลองดูตัวอย่างโค้ดในไฟล์ <code>src/app/supabase-test/page.tsx</code> นี้ได้เลย</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
