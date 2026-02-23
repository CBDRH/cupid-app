import { faCheck, faCheckDouble, faCircleQuestion, faXmark } from "@fortawesome/free-solid-svg-icons";


export const evidenceLevels = [
  {
    label: "Unknown",
    bgColor: "bg-gray-50",
    textColor: "text-gray-300",
    labelColor: "text-gray-400",
    icon: faXmark,
    hoverMessage:
      "<b>Unknown</b> No studies that met your search criteria have evaluated this activity",
  },
  {
    label: "Limited",
    bgColor: "bg-gray-100",
    textColor: "text-gray-500",
    labelColor: "text-gray-400",
    icon: faXmark,
    hoverMessage:
      "<b>Limited</b> Only one or two studies that met your search criteria have evaluated this activity",
  },
  {
    label: "Warning",
    bgColor: "bg-red-500",
    textColor: "text-red-100",
    labelColor: "text-red-300",
    icon: faXmark,
    hoverMessage:
      "<b>Warning</b> At least three studies that met your search criteria have evaluated this activity but no studies have reported a positive or mixed impact on outcomes",
  },
  {
    label: "Unlikely",
    bgColor: "bg-orange-500",
    textColor: "text-orange-100",
    labelColor: "text-orange-300",
    icon: faXmark,
    hoverMessage:
      "<b>Unlikely</b> At least three studies that met your search criteria have evaluated this activity and at least one study but less than half of these studies (less than 46%) report a positive or mixed impact on outcomes (a ratio greater than 0 but less than 0.85:1)",
  },
  {
    label: "Potential",
    bgColor: "bg-teal-200",
    textColor: "text-teal-600",
    labelColor: "text-teal-50",
    icon: faCircleQuestion,
    hoverMessage:
      "<b>Potential</b> At least three studies that met your search criteria have evaluated this activity and approximately half of these studies (between 45.9% to 59.9%) report a positive or mixed impact on outcomes (a ratio between 0.85:1 and 1.5:1)",
  },
  {
    label: "Probable",
    bgColor: "bg-green-200",
    textColor: "text-green-500",
    labelColor: "text-green-50",
    icon: faCheck,
    hoverMessage:
      "<b>Probable</b> At least three studies that met your search criteria have evaluated this activity and most studies (at least 60%) report a positive or mixed impact on outcomes (a ratio between 1.5:1 and 2:1)",
  },
  {
    label: "Likely",
    bgColor: "bg-green-500",
    textColor: "text-green-50",
    labelColor: "text-green-100",
    icon: faCheckDouble,
    hoverMessage:
      "<b>Likely</b> At least three studies that met your search criteria have evaluated this activity and a ratio of at least two to one of these studies report a positive or mixed impact on outcomes (it is at least twice as likely that a study will support this activity)",
  },
];
