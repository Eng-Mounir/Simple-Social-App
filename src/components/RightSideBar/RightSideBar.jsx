import React from "react";
import { FiUsers, FiSearch, FiUserPlus } from "react-icons/fi";

export default function RightSideBar() {
  return (
    <aside className="hidden h-fit xl:sticky xl:top-[84px] xl:block">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

        {/* Header */}
        <div className="mb-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <FiUsers className="text-[#1877f2] w-5 h-5" />
            <h3 className="text-base font-extrabold text-slate-900">
              Suggested Friends
            </h3>
          </div>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-600">
            5
          </span>
        </div>

        {/* Search */}
        <div className="mb-3">
          <label className="relative block">
            <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              placeholder="Search friends..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-700 outline-none focus:border-[#1877f2] focus:bg-white"
            />
          </label>
        </div>

        {/* Friend Card */}
        <div className="space-y-3">
          <div className="rounded-xl border border-slate-200 p-2.5">
            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                className="flex min-w-0 items-center gap-2 rounded-lg px-1 py-1 text-left transition hover:bg-slate-50"
              >
                <img
                  alt="Ahmed Bahnasy"
                  className="h-10 w-10 rounded-full object-cover"
                  src="https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/1771018057253-2285ec56-8e3c-4ea3-9ee4-c235037ffffe-Screenshot-2026-02-13-at-11.27.15---PM.png"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-slate-900 hover:underline">
                    Ahmed Bahnasy
                  </p>
                  <p className="truncate text-xs text-slate-500">@bahnasy20222</p>
                </div>
              </button>

              <button className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold transition bg-[#e7f3ff] text-[#1877f2] hover:bg-[#d8ebff]">
                <FiUserPlus className="w-3 h-3" />
                Follow
              </button>
            </div>

            <div className="mt-2 flex items-center gap-2 text-[11px] font-semibold text-slate-500">
              <span className="rounded-full bg-slate-100 px-2 py-0.5">75 followers</span>
            </div>
          </div>
        </div>

        {/* View More */}
        <button className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100">
          View more
        </button>
      </div>
    </aside>
  );
}
