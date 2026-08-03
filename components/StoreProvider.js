"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { INITIAL_JOBS, INITIAL_AVAILABILITY, DEMO_CUSTOMER } from "@/lib/mockData";

const StoreContext = createContext(null);

let jobCounter = INITIAL_JOBS.length;

export function StoreProvider({ children }) {
  const [role, setRole] = useState(null); // null | 'customer' | 'owner'
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [availability, setAvailability] = useState(INITIAL_AVAILABILITY);
  const [toast, setToast] = useState(null);

  const updateJob = useCallback((id, patch) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === id ? { ...j, ...(typeof patch === "function" ? patch(j) : patch) } : j))
    );
  }, []);

  const getJob = useCallback((id) => jobs.find((j) => j.id === id) || null, [jobs]);

  const submitNewRequest = useCallback((data) => {
    jobCounter += 1;
    const id = `J-${1000 + jobCounter}`;
    const newJob = {
      id,
      customer: { name: DEMO_CUSTOMER.name, email: DEMO_CUSTOMER.email, phone: DEMO_CUSTOMER.phone },
      category: data.category,
      description: data.description,
      photos: data.photos,
      address: data.address,
      budgetRange: data.budgetRange,
      submittedDate: new Date().toISOString().slice(0, 10),
      status: "Pending review",
      unread: true,
      quote: null,
      declineReason: null,
      scheduledMonth: null,
      scheduledDate: null,
      depositPaid: false,
      balancePaid: false,
      completedDate: null,
    };
    setJobs((prev) => [newJob, ...prev]);
    setToast({ jobId: id, customerName: newJob.customer.name, category: data.category });
    return id;
  }, []);

  const markJobRead = useCallback((id) => updateJob(id, { unread: false }), [updateJob]);

  const sendQuote = useCallback(
    (id, quote) => updateJob(id, { quote, status: "Quote sent", declineReason: null }),
    [updateJob]
  );

  const acceptQuote = useCallback((id) => updateJob(id, { status: "Accepted" }), [updateJob]);

  const declineQuote = useCallback(
    (id, reason) => updateJob(id, { status: "Declined", declineReason: reason || "No reason given." }),
    [updateJob]
  );

  const scheduleMonth = useCallback(
    (id, monthObj) => {
      updateJob(id, { status: "Scheduled", scheduledMonth: monthObj });
      setAvailability((prev) =>
        prev.map((a) =>
          a.month === monthObj.month && a.year === monthObj.year ? { ...a, booked: a.booked + 1 } : a
        )
      );
    },
    [updateJob]
  );

  const assignExactDate = useCallback((id, date) => updateJob(id, { scheduledDate: date }), [updateJob]);

  const startJob = useCallback((id) => updateJob(id, { status: "In progress" }), [updateJob]);

  const payDeposit = useCallback((id) => updateJob(id, { depositPaid: true }), [updateJob]);

  const markComplete = useCallback(
    (id) => updateJob(id, { status: "Complete", completedDate: new Date().toISOString().slice(0, 10) }),
    [updateJob]
  );

  const payBalance = useCallback((id) => updateJob(id, { status: "Paid", balancePaid: true }), [updateJob]);

  const updateAvailabilityMonth = useCallback((month, year, patch) => {
    setAvailability((prev) => prev.map((a) => (a.month === month && a.year === year ? { ...a, ...patch } : a)));
  }, []);

  const dismissToast = useCallback(() => setToast(null), []);

  const customerJobs = useMemo(() => jobs.filter((j) => j.customer.email === DEMO_CUSTOMER.email), [jobs]);

  const value = useMemo(
    () => ({
      role,
      setRole,
      jobs,
      customerJobs,
      availability,
      toast,
      dismissToast,
      getJob,
      submitNewRequest,
      markJobRead,
      sendQuote,
      acceptQuote,
      declineQuote,
      scheduleMonth,
      assignExactDate,
      startJob,
      payDeposit,
      markComplete,
      payBalance,
      updateAvailabilityMonth,
    }),
    [
      role,
      jobs,
      customerJobs,
      availability,
      toast,
      dismissToast,
      getJob,
      submitNewRequest,
      markJobRead,
      sendQuote,
      acceptQuote,
      declineQuote,
      scheduleMonth,
      assignExactDate,
      startJob,
      payDeposit,
      markComplete,
      payBalance,
      updateAvailabilityMonth,
    ]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
