import { faWineBottle, faSmoking, faCannabis, faPills, faPrescriptionBottle, 
          faCheck, faCheckDouble, faMinusCircle, faExclamationCircle, faBan } 
          from "@fortawesome/free-solid-svg-icons";

export const impactLevels = [
  { drug: "Alcohol", variable: "use_summary_2", outcome: "use", icon: faWineBottle },
  { drug: "Alcohol", variable: "harm_summary_alcohol", outcome: "harm", icon: faWineBottle },
  { drug: "Alcohol", variable: "behav_summary_alcohol", outcome: "behaviour", icon: faWineBottle },
  { drug: "Alcohol", variable: "economic_alcohol", outcome: "economic", icon: faWineBottle },
  { drug: "Nicotine", variable: "use_summary_nicotine", outcome: "use", icon: faSmoking },
  { drug: "Nicotine", variable: "harm_summary_nicotine", outcome: "harm", icon: faSmoking },
  { drug: "Nicotine", variable: "behav_summary_nicotine", outcome: "behaviour", icon: faSmoking },
  { drug: "Nicotine", variable: "economic_nicotine", outcome: "economic", icon: faSmoking },
  { drug: "Cannabis", variable: "use_summary_cannabis", outcome: "use", icon: faCannabis },
  { drug: "Cannabis", variable: "harm_summary_cannabis", outcome: "harm", icon: faCannabis },
  { drug: "Cannabis", variable: "behav_summary_cannabis", outcome: "behaviour", icon: faCannabis },
  { drug: "Cannabis", variable: "economic_cannabis", outcome: "economic", icon: faCannabis },
  { drug: "Other illicit drugs", variable: "use_summary_illicit", outcome: "use", icon: faPills },
  { drug: "Other illicit drugs", variable: "harm_summary_illicit", outcome: "harm", icon: faPills },
  { drug: "Other illicit drugs", variable: "behav_summary_illicit", outcome: "behaviour", icon: faPills },
  { drug: "Other illicit drugs", variable: "economic_illicit", outcome: "economic", icon: faPills },
  { drug: "Unspecified drugs", variable: "use_summary_1", outcome: "use", icon: faPrescriptionBottle },
  { drug: "Unspecified drugs", variable: "harm_summary_1", outcome: "harm", icon: faPrescriptionBottle },
  { drug: "Unspecified drugs", variable: "behav_summary_1", outcome: "behaviour", icon: faPrescriptionBottle },
  { drug: "Unspecified drugs", variable: "economic_unspecified", outcome: "economic", icon: faPrescriptionBottle }
];

export const impactCodes = [
 { impact: "Positive", bgColor: "bg-green-500", textColor: "text-green-100", labelColor: "text-emerald-50", icon: faCheckDouble },
 { impact: "Mixed", bgColor: "bg-emerald-200", textColor: "text-emerald-600", labelColor: "text-emerald-600", icon: faCheck },
 { impact: "Neutral", bgColor: "bg-gray-200", textColor: "text-gray-600", labelColor: "text-gray-600", icon: faMinusCircle },
 { impact: "Warning", bgColor: "bg-rose-200", textColor: "text-rose-600", labelColor: "text-rose-600", icon: faExclamationCircle },
 { impact: "Avoid", bgColor: "bg-red-200", textColor: "text-red-600", labelColor: "text-red-600", icon: faBan }
];