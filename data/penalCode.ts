
import { Charge, ChargeCategory } from '../types';

export const PENAL_CODE: Charge[] = [
  {
    id: "first_degree_speeding_principal",
    code: "",
    title: "First Degree Speeding",
    description: "Traveling more than 55mph over the speed limit.",
    burdenOfProof: "speeds exceeding 55 mph",
    months: 0,
    fine: 2000,
    category: ChargeCategory.INFRACTION
  },
  {
    id: "second_degree_speeding_principal",
    code: "",
    title: "Second Degree Speeding",
    description: "Traveling 35 - 55 mph over the speed limit.",
    burdenOfProof: "Speeds exceeding between 35-55 mph over the speed limit",
    months: 0,
    fine: 1000,
    category: ChargeCategory.INFRACTION
  },
  {
    id: "evading_principal",
    code: "",
    title: "Evading",
    description: "Resists lawful detainment while in a vehicle",
    burdenOfProof: "Defendant fled from a lawful order\nDefendant was driving a vehicle",
    months: 15,
    fine: 800,
    category: ChargeCategory.FELONY
  },
  {
    id: "evading_accessory",
    code: "",
    title: "Evading (Accessory)",
    description: "Resists lawful detainment while in a vehicle as a passenger",
    burdenOfProof: "Defendant fled from a lawful order\nDefendant was driving a vehicle",
    months: 10,
    fine: 500,
    category: ChargeCategory.FELONY
  },
  {
    id: "unlawful_possession_of_mail_principal",
    code: "",
    title: "Unlawful Possession of Mail",
    description: "The unauthorized possession, holding, or control of mail or parcels addressed to another individual without their consent or legal justification. This includes personal correspondence, official documents, or any items delivered through the postal system that belong to someone else.",
    burdenOfProof: "The defendant was in possession of mail or parcels not addressed to them or under their lawful control.\nThe defendant did not have the consent of the mail's rightful owner or a legal reason to possess the mail.\nThe mail in question was obtained through unlawful means or retained beyond what is considered reasonable.",
    months: 10,
    fine: 400,
    category: ChargeCategory.MISDEMEANOR
  },
  {
    id: "hostage_taking_principal",
    code: "",
    title: "Hostage Taking",
    description: "Holding or moving a person against their will under the perceived or actual threat of violence with the purpose of using them as leverage for any tangible or intangible benefit.",
    burdenOfProof: "Unlawfully moves or detains a person\nUses or implies force through the circumstances, threats of violence.",
    months: 40,
    fine: 2500,
    category: ChargeCategory.FELONY
  },
  {
    id: "hostage_taking_accessory",
    code: "",
    title: "Hostage Taking (Accessory)",
    description: "The act of assisting in holding or moving a person against their will under the perceived or actual threat of violence with the purpose of using them as leverage for any tangible or intangible benefit.",
    burdenOfProof: "Unlawfully moves or detains a person\nUses or implies force through the circumstances, threats of violence.",
    months: 30,
    fine: 1500,
    category: ChargeCategory.FELONY
  },
  {
    id: "hostage_taking_conspiracy",
    code: "",
    title: "Hostage Taking (Conspiracy)",
    description: "The act of conspiring to hold or move a person against their will under the perceived or actual threat of violence with the purpose of using them as leverage for any tangible or intangible benefit. This includes but is not limited to planning or paying someone else to commit the crime.",
    burdenOfProof: "Unlawfully moves or detains a person\nUses or implies force through the circumstances, threats of violence.",
    months: 25,
    fine: 1000,
    category: ChargeCategory.FELONY
  },
  {
    id: "illegal_turn_passing_principal",
    code: "",
    title: "Illegal Turn/Passing",
    description: "Dangerously turning in front of or passing another vehicle by a shoulder, median, or solid lines.",
    burdenOfProof: "Passed or turned in front of another vehicle dangerously",
    months: 0,
    fine: 250,
    category: ChargeCategory.INFRACTION
  },
  {
    id: "disobeying_traffic_control_device_principal",
    code: "",
    title: "Disobeying Traffic Control Device",
    description: "Does not obey a sign or signal defined as regulatory.",
    burdenOfProof: "Did not obey a sign or signal",
    months: 0,
    fine: 200,
    category: ChargeCategory.INFRACTION
  },
  {
    id: "aggravated_assault_and_battery_principal",
    code: "",
    title: "Aggravated Assault and Battery",
    description: "Any willful and unlawful use of force or violence upon the person of another that results in a injury with the use of a weapon",
    burdenOfProof: "Unlawful use (or threat for Agg Assault) of force or violence\nResulting in an injury of another individual through use of a weapon",
    months: 30,
    fine: 1400,
    category: ChargeCategory.FELONY
  },
  {
    id: "aggravated_assault_and_battery_attempted",
    code: "",
    title: "Aggravated Assault and Battery (Attempted)",
    description: "Unlawful attempt or threat to commit a violent injury on another with the use of a weapon.",
    burdenOfProof: "Unlawful use (or threat for Agg Assault) of force or violence\nResulting in an injury of another individual through use of a weapon",
    months: 25,
    fine: 1200,
    category: ChargeCategory.FELONY
  },
  {
    id: "aggravated_assault_and_battery_accessory",
    code: "",
    title: "Aggravated Assault and Battery (Accessory)",
    description: "Anyone who harbors, assists, plans, or otherwise aids another in the commission of injuring another person with a weapon.",
    burdenOfProof: "Unlawful use (or threat for Agg Assault) of force or violence\nResulting in an injury of another individual through use of a weapon",
    months: 25,
    fine: 1000,
    category: ChargeCategory.FELONY
  },
  {
    id: "third_degree_speeding_principal",
    code: "",
    title: "Third Degree Speeding",
    description: "Traveling 0 - 34 mph over the speed limit.",
    burdenOfProof: "Speeds exceeding between 1-34 mph over the speed limit",
    months: 0,
    fine: 500,
    category: ChargeCategory.INFRACTION
  },
  {
    id: "extortion_principal",
    code: "",
    title: "Extortion",
    description: "The person who directly used threats or coercion to obtain value from another",
    burdenOfProof: "The defendant used threats, coercion, or intimidation to influence another person’s actions. \nThe intent was to obtain money, goods, services, or some form of value from the victim. \nThe victim acted (or was intended to act) under duress or against their will as a result of the threat or pressure. ",
    months: 300,
    fine: 7500,
    category: ChargeCategory.FELONY
  },
  {
    id: "extortion_accessory",
    code: "",
    title: "Extortion (Accessory)",
    description: "Someone who knowingly supported, enabled, or assisted the act of extortion (e.g.. backup, lookouts, enforcers).",
    burdenOfProof: "The defendant used threats, coercion, or intimidation to influence another person’s actions. \nThe intent was to obtain money, goods, services, or some form of value from the victim. \nThe victim acted (or was intended to act) under duress or against their will as a result of the threat or pressure. ",
    months: 200,
    fine: 5000,
    category: ChargeCategory.FELONY
  },
  {
    id: "extortion_conspiracy",
    code: "",
    title: "Extortion (Conspiracy)",
    description: "Two or more people planning or agreeing to extort a person, regardless of whether it was completed",
    burdenOfProof: "The defendant used threats, coercion, or intimidation to influence another person’s actions. \nThe intent was to obtain money, goods, services, or some form of value from the victim. \nThe victim acted (or was intended to act) under duress or against their will as a result of the threat or pressure. ",
    months: 120,
    fine: 3000,
    category: ChargeCategory.FELONY
  },
  {
    id: "extortion_attempted",
    code: "",
    title: "Extortion (Attempted)",
    description: "Clear steps were taken to commit extortion, but the victim did not comply or the act was interrupted before completion",
    burdenOfProof: "The defendant used threats, coercion, or intimidation to influence another person’s actions. \nThe intent was to obtain money, goods, services, or some form of value from the victim. \nThe victim acted (or was intended to act) under duress or against their will as a result of the threat or pressure. ",
    months: 60,
    fine: 3000,
    category: ChargeCategory.FELONY
  },
  {
    id: "government_corruption_court_charge_principal",
    code: "",
    title: "Government Corruption - COURT CHARGE",
    description: "The individual who directly committed the corrupt act while in a government position or using government resources.",
    burdenOfProof: "The defendant used a government position, access, or resource (such as vehicles, databases, or credentials). \nThe usage was intended to break the law, gain personal benefit, protect others unlawfully, or cover up misconduct. \nThe defendant either held a government role or unlawfully accessed or controlled government authority or property. For Escalations \nEscalation applies when the offense involves financial gain or abuse of public trust (e.g., bribes, kickbacks, embezzlement). ",
    months: 4320,
    fine: 100000,
    category: ChargeCategory.FELONY
  },
  {
    id: "government_corruption_court_charge_accessory",
    code: "",
    title: "Government Corruption - COURT CHARGE (Accessory)",
    description: "Someone who knowingly helped, protected, or enabled a government official to commit or cover up corruption.",
    burdenOfProof: "The defendant used a government position, access, or resource (such as vehicles, databases, or credentials). \nThe usage was intended to break the law, gain personal benefit, protect others unlawfully, or cover up misconduct. \nThe defendant either held a government role or unlawfully accessed or controlled government authority or property. For Escalations \nEscalation applies when the offense involves financial gain or abuse of public trust (e.g., bribes, kickbacks, embezzlement). ",
    months: 2880,
    fine: 50000,
    category: ChargeCategory.FELONY
  },
  {
    id: "government_corruption_court_charge_attempted",
    code: "",
    title: "Government Corruption - COURT CHARGE (Attempted)",
    description: "The individual took clear steps to commit corruption using their government position but was stopped or failed before completing the act.",
    burdenOfProof: "The defendant used a government position, access, or resource (such as vehicles, databases, or credentials). \nThe usage was intended to break the law, gain personal benefit, protect others unlawfully, or cover up misconduct. \nThe defendant either held a government role or unlawfully accessed or controlled government authority or property. For Escalations \nEscalation applies when the offense involves financial gain or abuse of public trust (e.g., bribes, kickbacks, embezzlement). ",
    months: 2880,
    fine: 50000,
    category: ChargeCategory.FELONY
  },
  {
    id: "government_corruption_court_charge_conspiracy",
    code: "",
    title: "Government Corruption - COURT CHARGE (Conspiracy)",
    description: "Two or more individuals agreeing or planning to use a government position or access for illegal purposes, even if the act was not completed.",
    burdenOfProof: "The defendant used a government position, access, or resource (such as vehicles, databases, or credentials). \nThe usage was intended to break the law, gain personal benefit, protect others unlawfully, or cover up misconduct. \nThe defendant either held a government role or unlawfully accessed or controlled government authority or property. For Escalations \nEscalation applies when the offense involves financial gain or abuse of public trust (e.g., bribes, kickbacks, embezzlement). ",
    months: 1440,
    fine: 35000,
    category: ChargeCategory.FELONY
  },
  {
    id: "criminal_stockpiling_of_breaching_explosives_class_1_principal",
    code: "",
    title: "Criminal Stockpiling of Breaching Explosives (Class 1)",
    description: "Possessed 5 or more breaching explosives intended for use in property crimes such as heists or break-ins.",
    burdenOfProof: "Possession of 5 or more breaching-type explosive devices (e.g., thermite, vault breachers) \nDevices were not military-grade or anti-personnel \nSuspect had no lawful authority to possess such quantity",
    months: 120,
    fine: 15000,
    category: ChargeCategory.FELONY
  },
  {
    id: "criminal_stockpiling_of_breaching_explosives_class_1_accessory",
    code: "",
    title: "Criminal Stockpiling of Breaching Explosives (Class 1) (Accessory)",
    description: "Assissted in the possession, storage, or transport of 5 or more breaching explosives with knowledge of their criminal purpose.",
    burdenOfProof: "Possession of 5 or more breaching-type explosive devices (e.g., thermite, vault breachers) \nDevices were not military-grade or anti-personnel \nSuspect had no lawful authority to possess such quantity",
    months: 60,
    fine: 7500,
    category: ChargeCategory.FELONY
  },
  {
    id: "coercion_of_a_public_official_court_charge_principal",
    code: "",
    title: "Coercion of a Public Official - COURT CHARGE",
    description: "The individual who directly coerced or attempted to coerce a government official into wrongdoing.",
    burdenOfProof: "The defendant made threats, used intimidation, the promise of gifts or renumeration, or applied undue pressure to a government official. \nThe intent was to cause the official to take an unlawful action, neglect their duties, or abuse their authority. \nThe official was influenced, or a clear attempt was made to influence them, against their lawful responsibilities. ",
    months: 600,
    fine: 25000,
    category: ChargeCategory.FELONY
  },
  {
    id: "coercion_of_a_public_official_court_charge_accessory",
    code: "",
    title: "Coercion of a Public Official - COURT CHARGE (Accessory)",
    description: "Two or more individuals agreeing or planning to coerce a public official into misconduct, whether or not the plan was carried out.",
    burdenOfProof: "The defendant made threats, used intimidation, the promise of gifts or renumeration, or applied undue pressure to a government official. \nThe intent was to cause the official to take an unlawful action, neglect their duties, or abuse their authority. \nThe official was influenced, or a clear attempt was made to influence them, against their lawful responsibilities. ",
    months: 400,
    fine: 20000,
    category: ChargeCategory.FELONY
  },
  {
    id: "coercion_of_a_public_official_court_charge_conspiracy",
    code: "",
    title: "Coercion of a Public Official - COURT CHARGE (Conspiracy)",
    description: "Someone who knowingly assisted, enabled, or supported the coercion of a government offical.",
    burdenOfProof: "The defendant made threats, used intimidation, the promise of gifts or renumeration, or applied undue pressure to a government official. \nThe intent was to cause the official to take an unlawful action, neglect their duties, or abuse their authority. \nThe official was influenced, or a clear attempt was made to influence them, against their lawful responsibilities. ",
    months: 300,
    fine: 15000,
    category: ChargeCategory.FELONY
  },
  {
    id: "coercion_of_a_public_official_court_charge_attempted",
    code: "",
    title: "Coercion of a Public Official - COURT CHARGE (Attempted)",
    description: "The defendant took clear steps to coerce a government offical but did not succeed in influencing their actions.",
    burdenOfProof: "The defendant made threats, used intimidation, the promise of gifts or renumeration, or applied undue pressure to a government official. \nThe intent was to cause the official to take an unlawful action, neglect their duties, or abuse their authority. \nThe official was influenced, or a clear attempt was made to influence them, against their lawful responsibilities. ",
    months: 300,
    fine: 15000,
    category: ChargeCategory.FELONY
  },
  {
    id: "witness_intimidation_court_charge_principal",
    code: "",
    title: "Witness Intimidation - COURT CHARGE",
    description: "Directly threatened or coerced a witness",
    burdenOfProof: "The defendant directly or indirectly contacted a witness or potential witness. \nThe contact involved threats, coercion, or pressure to alter their behavior. \nThe intent was to interfere with a legal proceeding or investigation. ",
    months: 360,
    fine: 7500,
    category: ChargeCategory.FELONY
  },
  {
    id: "witness_intimidation_court_charge_accessory",
    code: "",
    title: "Witness Intimidation - COURT CHARGE (Accessory)",
    description: "Helped plan or deliver the threat of protected the offender.",
    burdenOfProof: "The defendant directly or indirectly contacted a witness or potential witness. \nThe contact involved threats, coercion, or pressure to alter their behavior. \nThe intent was to interfere with a legal proceeding or investigation. ",
    months: 240,
    fine: 5000,
    category: ChargeCategory.FELONY
  },
  {
    id: "witness_intimidation_court_charge_conspiracy",
    code: "",
    title: "Witness Intimidation - COURT CHARGE (Conspiracy)",
    description: "Participated in a plan to interfere with a witness.",
    burdenOfProof: "The defendant directly or indirectly contacted a witness or potential witness. \nThe contact involved threats, coercion, or pressure to alter their behavior. \nThe intent was to interfere with a legal proceeding or investigation. ",
    months: 90,
    fine: 3500,
    category: ChargeCategory.FELONY
  },
  {
    id: "witness_intimidation_court_charge_attempted",
    code: "",
    title: "Witness Intimidation - COURT CHARGE (Attempted)",
    description: "Took steps to intimidate a witness, but the act was interrupted or failed.",
    burdenOfProof: "The defendant directly or indirectly contacted a witness or potential witness. \nThe contact involved threats, coercion, or pressure to alter their behavior. \nThe intent was to interfere with a legal proceeding or investigation. ",
    months: 90,
    fine: 3500,
    category: ChargeCategory.FELONY
  },
  {
    id: "grand_theft_auto_principal",
    code: "",
    title: "Grand Theft Auto",
    description: "Unlawfully taking a vehicle belonging to another or driving the vehicle without the owner's consent.",
    burdenOfProof: "Person is possession of a vehicle that is not theirs\nThe owner of the vehicle did not give consent to the person in possession\nWith the intent to permanently deprive the owner of the vehicle",
    months: 25,
    fine: 1000,
    category: ChargeCategory.FELONY
  },
  {
    id: "grand_theft_auto_accessory",
    code: "",
    title: "Grand Theft Auto (Accessory)",
    description: "A Person who assists, plans, or otherwise aids another in the act of unlawfully taking a vehicle belonging to another.",
    burdenOfProof: "Person is possession of a vehicle that is not theirs\nThe owner of the vehicle did not give consent to the person in possession\nWith the intent to permanently deprive the owner of the vehicle",
    months: 10,
    fine: 500,
    category: ChargeCategory.MISDEMEANOR
  },
  {
    id: "reckless_evading_principal",
    code: "",
    title: "Reckless Evading",
    description: "Dangerously flees from law enforcement while operating a motor vehicle to avoid being apprehended, detained, or arrested.",
    burdenOfProof: "Defendant fled from a lawful order \nDefendant was driving a vehicle\nDefendant caused significant damage to property OR; injury to another citizen(s).",
    months: 20,
    fine: 1200,
    category: ChargeCategory.FELONY
  },
  {
    id: "possession_of_controlled_substance_marijuana_principal_1",
    code: "",
    title: "Possession of Controlled Substance (Marijuana)",
    description: "Any person found to have 25+ Marijuana joints or 3+ Marijuana plants/seeds on their person.",
    burdenOfProof: "Possesses Marijuana plants/seeds or joints",
    months: 25,
    fine: 2000,
    category: ChargeCategory.FELONY
  },
  {
    id: "possession_of_controlled_substance_marijuana_principal_2",
    code: "",
    title: "Possession of Controlled Substance (Marijuana)",
    description: "Any person found to have 15+ Marijuana joints or 2 Marijuana plants/seeds on their person.",
    burdenOfProof: "Possesses Marijuana plants/seeds or joints",
    months: 10,
    fine: 1500,
    category: ChargeCategory.MISDEMEANOR
  },
  {
    id: "possession_of_controlled_substance_marijuana_principal_3",
    code: "",
    title: "Possession of Controlled Substance (Marijuana)",
    description: "Any person found to have 1+ Marijuana joints or 1 Marijuana plants/seeds on their person.",
    burdenOfProof: "Possesses Marijuana plants/seeds or joints",
    months: 0,
    fine: 1000,
    category: ChargeCategory.INFRACTION
  },
  {
    id: "resisting_arrest_principal",
    code: "",
    title: "Resisting Arrest",
    description: "Resists lawful detainment while on foot, OR; as passenger in a fleeing vehicle.",
    burdenOfProof: "Defendant fled from a lawful order\nDefendant was on foot OR; was a passenger in a fleeing vehicle",
    months: 10,
    fine: 500,
    category: ChargeCategory.MISDEMEANOR
  },
  {
    id: "assault_and_battery_principal",
    code: "",
    title: "Assault and Battery",
    description: "Battery: Any willful and unlawful use of force or violence upon the person of another that results in injury.",
    burdenOfProof: "Unlawful use (or threat of for assault) of force or violence\nInjury to another person (For Battery only)",
    months: 10,
    fine: 600,
    category: ChargeCategory.MISDEMEANOR
  },
  {
    id: "assault_and_battery_attempted",
    code: "",
    title: "Assault and Battery (Attempted)",
    description: "Assault: Any unlawful threat and ability to commit violent injury upon a person.",
    burdenOfProof: "Unlawful use (or threat of for assault) of force or violence\nInjury to another person (For Battery only)",
    months: 10,
    fine: 450,
    category: ChargeCategory.MISDEMEANOR
  },
  {
    id: "assault_and_battery_accessory",
    code: "",
    title: "Assault and Battery (Accessory)",
    description: "Anyone who harbors, assists, plans, or otherwise aids another in the commission of injuring another person.",
    burdenOfProof: "Unlawful use (or threat of for assault) of force or violence\nInjury to another person (For Battery only)",
    months: 5,
    fine: 250,
    category: ChargeCategory.MISDEMEANOR
  },
  {
    id: "assault_and_battery_conspiracy",
    code: "",
    title: "Assault and Battery (Conspiracy)",
    description: "Conspiring to commit violence on another person. This includes planning, discussing plans to, and/or paying another party to injure another person",
    burdenOfProof: "Unlawful use (or threat of for assault) of force or violence\nInjury to another person (For Battery only)",
    months: 5,
    fine: 200,
    category: ChargeCategory.MISDEMEANOR
  },
  {
    id: "negligent_driving_principal",
    code: "",
    title: "Negligent Driving",
    description: "Drives in a way that is negligent with no regard to basic traffic rules.",
    burdenOfProof: "Driving negligently\nDisregarded basic traffic rules (2 or more)",
    months: 0,
    fine: 300,
    category: ChargeCategory.INFRACTION
  },
  {
    id: "fishing_without_a_license_principal_1",
    code: "",
    title: "Fishing without a license",
    description: "Third+ Offense",
    burdenOfProof: "Was actively fishing or assumed to be fishing near any body of water, river, or reservoir.\n\nDid not have a valid fishing license",
    months: 0,
    fine: 2500,
    category: ChargeCategory.INFRACTION
  },
  {
    id: "fishing_without_a_license_principal_2",
    code: "",
    title: "Fishing without a license",
    description: "Second Offense",
    burdenOfProof: "Was actively fishing or assumed to be fishing near any body of water, river, or reservoir.\n\nDid not have a valid fishing license",
    months: 0,
    fine: 1000,
    category: ChargeCategory.INFRACTION
  },
  {
    id: "fishing_without_a_license_principal_3",
    code: "",
    title: "Fishing without a license",
    description: "First Offense",
    burdenOfProof: "Was actively fishing or assumed to be fishing near any body of water, river, or reservoir.\n\nDid not have a valid fishing license",
    months: 0,
    fine: 250,
    category: ChargeCategory.INFRACTION
  },
  {
    id: "community_service_principal",
    code: "",
    title: "Community Service",
    description: "New Modifier",
    burdenOfProof: "The subject has been given a task to benefit the community in exchange for a reduced or no jail time.",
    months: 1,
    fine: 0,
    category: ChargeCategory.MISDEMEANOR
  },
  {
    id: "disorderly_conduct_principal_1",
    code: "",
    title: "Disorderly Conduct",
    description: "Individual who has repeatedly engaged in offensive acts or language to accost or annoy other individuals",
    burdenOfProof: "Person has disrupted order\nPerson has accosted or annoyed others with offensive acts or language",
    months: 5,
    fine: 250,
    category: ChargeCategory.MISDEMEANOR
  },
  {
    id: "disorderly_conduct_principal_2",
    code: "",
    title: "Disorderly Conduct",
    description: "Individual who has engaged in offensive acts or language to accost or annoy other individuals",
    burdenOfProof: "Person has disrupted order\nPerson has accosted or annoyed others with offensive acts or language",
    months: 0,
    fine: 100,
    category: ChargeCategory.INFRACTION
  },
  {
    id: "first_degree_murder_court_charge_principal",
    code: "",
    title: "First Degree Murder - COURT CHARGE",
    description: "The unlawful killing of another person without justification, with intent to kill and premeditation.",
    burdenOfProof: "The defendant killed someone\nUnless attempted or conspiracy.\nThe defendant intended to commit the murder\nThe defendant premeditated the murder\n\n",
    months: 4320,
    fine: 20000,
    category: ChargeCategory.FELONY
  },
  {
    id: "first_degree_murder_court_charge_attempted",
    code: "",
    title: "First Degree Murder - COURT CHARGE (Attempted)",
    description: "Attempting to murder a human with intent and premeditation.",
    burdenOfProof: "The defendant killed someone\nUnless attempted or conspiracy.\nThe defendant intended to commit the murder\nThe defendant premeditated the murder\n\n",
    months: 2880,
    fine: 15000,
    category: ChargeCategory.FELONY
  },
  {
    id: "first_degree_murder_court_charge_accessory",
    code: "",
    title: "First Degree Murder - COURT CHARGE (Accessory)",
    description: "Aids and or Abets in the unlawful killing of another person without justification, with intent to kill and premeditation.",
    burdenOfProof: "The defendant killed someone\nUnless attempted or conspiracy.\nThe defendant intended to commit the murder\nThe defendant premeditated the murder\n\n",
    months: 2880,
    fine: 10000,
    category: ChargeCategory.FELONY
  },
  {
    id: "first_degree_murder_court_charge_conspiracy",
    code: "",
    title: "First Degree Murder - COURT CHARGE (Conspiracy)",
    description: "Conspiracy to commit first-degree murder includes planning, discussing plans, and paying another party to commit first degree murder. The defendant must have had the means, intent and pre-meditation.",
    burdenOfProof: "The defendant killed someone\nUnless attempted or conspiracy.\nThe defendant intended to commit the murder\nThe defendant premeditated the murder\n\n",
    months: 720,
    fine: 10000,
    category: ChargeCategory.FELONY
  },
  {
    id: "violation_of_a_court_order_court_charge_principal",
    code: "",
    title: "Violation of a Court Order - COURT CHARGE",
    description: "Willful disobedience of the terms written in a court order.",
    burdenOfProof: "Was ordered by the court    \nSuspect disobeyed the order",
    months: 1,
    fine: 1,
    category: ChargeCategory.FELONY
  },
  {
    id: "violation_of_a_court_order_court_charge_accessory",
    code: "",
    title: "Violation of a Court Order - COURT CHARGE (Accessory)",
    description: "Assisting in the Willful disobedience of the terms written in a court order",
    burdenOfProof: "Was ordered by the court    \nSuspect disobeyed the order",
    months: 1,
    fine: 1,
    category: ChargeCategory.FELONY
  },
  {
    id: "perjury_court_charge_principal",
    code: "",
    title: "Perjury - COURT CHARGE",
    description: "Knowingly lies under oath in judicial proceedings.",
    burdenOfProof: "Defendant was under oath\nDefendant knowingly lied",
    months: 1,
    fine: 1,
    category: ChargeCategory.FELONY
  },
  {
    id: "criminal_use_of_a_firearm_principal_1",
    code: "",
    title: "Criminal Use of a Firearm",
    description: "Unlawful discharge of a firearm or use of firearm in commission of a felony.",
    burdenOfProof: "Unlawfully discharged firearm OR\nFirearm was used in commission of a crime",
    months: 25,
    fine: 1250,
    category: ChargeCategory.FELONY
  },
  {
    id: "criminal_use_of_a_firearm_principal_2",
    code: "",
    title: "Criminal Use of a Firearm",
    description: "Unlawful discharge of a firearm or use of firearm in commission of a crime.",
    burdenOfProof: "Unlawfully discharged firearm OR\nFirearm was used in commission of a crime",
    months: 10,
    fine: 1250,
    category: ChargeCategory.MISDEMEANOR
  },
  {
    id: "impersonation_of_a_private_individual_principal",
    code: "",
    title: "Impersonation of a Private Individual",
    description: "The unlawful act of using someone else's identity, name, or likeness, with the intent to deceive or cause harm. This includes any action taken to fraudulently gain a benefit, damage the individual’s reputation, or cause other forms of personal or financial harm.",
    burdenOfProof: "The defendant knowingly used the name, identity, or likeness of another person without their consent.\nThe defendant intended to deceive or mislead others.\nThe defendant's actions caused harm or led to some improper benefit.",
    months: 20,
    fine: 900,
    category: ChargeCategory.MISDEMEANOR
  },
  {
    id: "failure_to_pay_tickets_principal_1",
    code: "",
    title: "Failure to Pay Tickets",
    description: "The Failure to pay tickets in a timely manor in regards to a traffic or non-traffic ticket issued by 15+ days",
    burdenOfProof: "Ticket has been unpaid past the date of the of expiry ",
    months: 10,
    fine: 2500,
    category: ChargeCategory.MISDEMEANOR
  },
  {
    id: "failure_to_pay_tickets_principal_2",
    code: "",
    title: "Failure to Pay Tickets",
    description: "The Failure to pay tickets in a timely manor in regards to a traffic or non-traffic ticket issued by 7-14 days",
    burdenOfProof: "Ticket has been unpaid past the date of the of expiry ",
    months: 0,
    fine: 1000,
    category: ChargeCategory.INFRACTION
  },
  {
    id: "failure_to_pay_tickets_principal_3",
    code: "",
    title: "Failure to Pay Tickets",
    description: "The Failure to pay tickets in a timely manor in regards to a traffic or non-traffic ticket issued by less then 7 days",
    burdenOfProof: "Ticket has been unpaid past the date of the of expiry ",
    months: 0,
    fine: 500,
    category: ChargeCategory.INFRACTION
  },
  {
    id: "misuse_of_emergency_services_principal",
    code: "",
    title: "Misuse of Emergency Services",
    description: "The intentional misuse of emergency services not limited to 911, 311, Emergency Medical Services or PD services",
    burdenOfProof: "Misuse of an emergency service with a disregard for emergency services",
    months: 10,
    fine: 500,
    category: ChargeCategory.MISDEMEANOR
  },
  {
    id: "identity_theft_principal",
    code: "",
    title: "Identity Theft",
    description: "The person who knowingly used or attempted to use another individuals identity or fake ID to gain access, benefits, or services.",
    burdenOfProof: "If using someone else's identity: \nThe defendant possessed identifying information belonging to another person, and \nUsed or attempted to use it, and \nDid so without that person’s consent and with the intent to deceive, defraud, or gain something illegally. \nIf using a fake ID: \nThe defendant possessed a fraudulent or altered identification card, and \nIntended to use it unlawfully. ",
    months: 45,
    fine: 3500,
    category: ChargeCategory.FELONY
  },
  {
    id: "identity_theft_accessory",
    code: "",
    title: "Identity Theft (Accessory)",
    description: "A person who knowingly assisted another in committing identity theft, Such as supplying a fraudulant ID or information",
    burdenOfProof: "If using someone else's identity: \nThe defendant possessed identifying information belonging to another person, and \nUsed or attempted to use it, and \nDid so without that person’s consent and with the intent to deceive, defraud, or gain something illegally. \nIf using a fake ID: \nThe defendant possessed a fraudulent or altered identification card, and \nIntended to use it unlawfully. ",
    months: 30,
    fine: 2500,
    category: ChargeCategory.FELONY
  },
  {
    id: "identity_theft_attempted",
    code: "",
    title: "Identity Theft (Attempted)",
    description: "The person took steps to use another persons ID or fake ID but the act was stopped",
    burdenOfProof: "If using someone else's identity: \nThe defendant possessed identifying information belonging to another person, and \nUsed or attempted to use it, and \nDid so without that person’s consent and with the intent to deceive, defraud, or gain something illegally. \nIf using a fake ID: \nThe defendant possessed a fraudulent or altered identification card, and \nIntended to use it unlawfully. ",
    months: 20,
    fine: 1500,
    category: ChargeCategory.FELONY
  },
  {
    id: "kidnapping_principal",
    code: "",
    title: "Kidnapping",
    description: "Holding or moving a person against their will under the perceived or actual threat of violence.",
    burdenOfProof: "Unlawfully moves or detains a person\nUses or implies force through the circumstances, threats of violence.",
    months: 30,
    fine: 1000,
    category: ChargeCategory.FELONY
  },
  {
    id: "kidnapping_accessory",
    code: "",
    title: "Kidnapping (Accessory)",
    description: "The act of assisting in holding or moving a person against their will under the perceived or actual threat of violence.",
    burdenOfProof: "Unlawfully moves or detains a person\nUses or implies force through the circumstances, threats of violence.",
    months: 25,
    fine: 750,
    category: ChargeCategory.FELONY
  },
  {
    id: "kidnapping_conspiracy",
    code: "",
    title: "Kidnapping (Conspiracy)",
    description: "The act of conspiring to hold or move a person against their will under the perceived or actual threat of violence. This includes but is not limited to planning or paying someone else to commit the crime.",
    burdenOfProof: "Unlawfully moves or detains a person\nUses or implies force through the circumstances, threats of violence.",
    months: 20,
    fine: 500,
    category: ChargeCategory.FELONY
  },
  {
    id: "sale_of_drugs_principal",
    code: "",
    title: "Sale of Drugs",
    description: "Sale of any controlled or dangerous controlled substance. (Oxy, Meth, Weed)",
    burdenOfProof: "Exchange of controlled or dangerous controlled substance\nExchange of money",
    months: 20,
    fine: 1500,
    category: ChargeCategory.FELONY
  },
  {
    id: "vandalism_principal",
    code: "",
    title: "Vandalism",
    description: "The intentional destruction, defacement, or damage of property belonging to another person, business, or public entity without permission. This includes graffiti, breaking windows, or damaging vehicles or buildings.",
    burdenOfProof: "The defendant willfully caused damage or defaced property.\nThe property belongs to another person, business, or public entity.\nThe defendant did not have consent to damage or alter the property.",
    months: 5,
    fine: 400,
    category: ChargeCategory.MISDEMEANOR
  },
  {
    id: "escaping_custody_principal",
    code: "",
    title: "Escaping Custody",
    description: "Escapes the custody of law enforcement after detainment or arrest.",
    burdenOfProof: "A person has been legally detained or arrested by a lawful order \nThe detained person escapes custody.",
    months: 45,
    fine: 2500,
    category: ChargeCategory.FELONY
  },
  {
    id: "escaping_custody_accessory",
    code: "",
    title: "Escaping Custody (Accessory)",
    description: "Person aids or assists another citizen in escaping the custody of law enforcement once that person has been, detained/arrested but before processing occurs.",
    burdenOfProof: "A person has been legally detained or arrested by a lawful order \nThe detained person escapes custody.",
    months: 25,
    fine: 1800,
    category: ChargeCategory.FELONY
  },
  {
    id: "trespassing_principal",
    code: "",
    title: "Trespassing",
    description: "Entering or remaining unlawfully upon a property without the permission or the right to do so.",
    burdenOfProof: "Enters or remains unlawfully in or on a property\nPermission to enter the premise was not given or was revoked\nIf permission was revoked the suspect must have been informed clearly and explicitly.",
    months: 10,
    fine: 250,
    category: ChargeCategory.MISDEMEANOR
  },
  {
    id: "trespassing_accessory",
    code: "",
    title: "Trespassing (Accessory)",
    description: "Assisting in Entering or remaining unlawfully upon a property without the permission or the right to do so.",
    burdenOfProof: "Enters or remains unlawfully in or on a property\nPermission to enter the premise was not given or was revoked\nIf permission was revoked the suspect must have been informed clearly and explicitly.",
    months: 5,
    fine: 125,
    category: ChargeCategory.MISDEMEANOR
  },
  {
    id: "trespassing_conspiracy",
    code: "",
    title: "Trespassing (Conspiracy)",
    description: "Conspiring to enter or remain unlawfully upon a property without the permission or the right to do so.",
    burdenOfProof: "Enters or remains unlawfully in or on a property\nPermission to enter the premise was not given or was revoked\nIf permission was revoked the suspect must have been informed clearly and explicitly.",
    months: 0,
    fine: 100,
    category: ChargeCategory.INFRACTION
  },
  {
    id: "criminal_possession_of_a_firearm_class_2_principal",
    code: "",
    title: "Criminal Possession of a Firearm Class 2",
    description: "Possess a Class 2 weapon without license or a weapon not registered to the individual in possession.",
    burdenOfProof: "Possesses Class 2 weapon\nSemi-automatic to automatic submachine guns and/ or shotgun\nDoes not have a weapons license and/or weapon is not registered to them\n﻿\n",
    months: 25,
    fine: 5000,
    category: ChargeCategory.FELONY
  },
  {
    id: "criminal_possession_of_a_firearm_class_3_principal",
    code: "",
    title: "Criminal Possession of a Firearm Class 3",
    description: "Possess a Class 3 weapon without license or a weapon not registered to the individual in possession.",
    burdenOfProof: " Possesses Class 3 weapon\nSemi-automatic to automatic rifles and/or high caliber weapons and/or weapons that discharge explosive projectiles.\nDoes not have a weapons license and/or weapon is not registered to them",
    months: 60,
    fine: 10000,
    category: ChargeCategory.FELONY
  },
  {
    id: "illegal_parking_principal",
    code: "",
    title: "Illegal Parking",
    description: "Parked a Vehicle Unlawfully in violation of public space designations or signage",
    burdenOfProof: "The vehicle was parked in a location where parking is not permitted by signage, painted markings, or temporary event restrictions.\nOR \nThe vehicle was parked in a manner that created a safety hazard, impeded traffic, or restricted public access.",
    months: 0,
    fine: 750,
    category: ChargeCategory.INFRACTION
  },
  {
    id: "voluntary_manslaughter_court_charge_principal",
    code: "",
    title: "Voluntary Manslaughter - COURT CHARGE",
    description: "Intentional killing of a person in response to a severe provocation or in the heat of passion.",
    burdenOfProof: "The defendant was provoked to violence\nThe defendant caused intentional injury that led to death.",
    months: 450,
    fine: 9000,
    category: ChargeCategory.FELONY
  },
  {
    id: "petty_theft_principal",
    code: "",
    title: "Petty Theft",
    description: "Stealing of items from another without the consent of the rightful owner.",
    burdenOfProof: "Possession of something that doesn't belong to them.\n Intent to keep the item permanently/ sell it.\n the item(s) value is $25-200.",
    months: 10,
    fine: 750,
    category: ChargeCategory.MISDEMEANOR
  },
  {
    id: "petty_theft_accessory",
    code: "",
    title: "Petty Theft (Accessory)",
    description: "Accessory to petty theft involves aiding, abetting, counseling, or assisting another person in the commission of petty theft.",
    burdenOfProof: "Possession of something that doesn't belong to them.\n Intent to keep the item permanently/ sell it.\n the item(s) value is $25-200.",
    months: 5,
    fine: 400,
    category: ChargeCategory.CITATION
  },
  {
    id: "reckless_endangerment_principal",
    code: "",
    title: "Reckless Endangerment",
    description: "Taking actions that create a substantial risk of serious physical injury to themselves or another person.",
    burdenOfProof: "Showed disregard for consequences of actions\nActions put someone at substantial risk of injury",
    months: 10,
    fine: 600,
    category: ChargeCategory.FELONY
  },
  {
    id: "possession_of_controlled_substance_oxy_principal_1",
    code: "",
    title: "Possession of Controlled Substance (Oxy)",
    description: "Any person found to have 10+ Oxy on their person.",
    burdenOfProof: " Possesses Oxy",
    months: 20,
    fine: 500,
    category: ChargeCategory.FELONY
  },
  {
    id: "possession_of_controlled_substance_oxy_principal_2",
    code: "",
    title: "Possession of Controlled Substance (Oxy)",
    description: "Any person found to have 5+ Oxy on their person.",
    burdenOfProof: " Possesses Oxy",
    months: 10,
    fine: 300,
    category: ChargeCategory.MISDEMEANOR
  },
  {
    id: "possession_of_controlled_substance_oxy_principal_3",
    code: "",
    title: "Possession of Controlled Substance (Oxy)",
    description: "Any person found to have 1+ Oxy on their person.",
    burdenOfProof: " Possesses Oxy",
    months: 0,
    fine: 150,
    category: ChargeCategory.MISDEMEANOR
  },
  {
    id: "impersonation_of_a_government_authority_principal",
    code: "",
    title: "Impersonation of a Government Authority",
    description: "The false representation of oneself as a government official or authority figure through verbal statements, wearing a uniform, presenting a badge, or using false credentials, with the intent to deceive others or improperly gain access to privileges, services, or information.",
    burdenOfProof: "The defendant falsely claimed, either verbally or through action (such as wearing a uniform or presenting credentials), to be a government official.\nor\nThe defendant used a government uniform, badge, or any other identifiable marker of authority, or verbally asserted their authority.\nand\nThe defendant’s actions caused harm or led to improper access to privileges, services, or information.",
    months: 60,
    fine: 3000,
    category: ChargeCategory.FELONY
  },
  {
    id: "street_racing_principal",
    code: "",
    title: "Street Racing",
    description: "A person shall not engage (organize or partake) in a street race on a highway or public roadway of any kind whether it be as a sport or for material gain. A street race can be against another vehicle or any kind of timing device.",
    burdenOfProof: "Evidence of Vehicles rapidly accelerating from a common starting point to speeds above the legal limit OR\nEvidence of vehicles operating side by side with one another at speeds exceeding the legal limit OR\nVehicles willingly comparing or contesting relative speeds over the speed limit",
    months: 60,
    fine: 2500,
    category: ChargeCategory.FELONY
  },
  {
    id: "criminal_sale_of_a_firearm_class_3_principal",
    code: "",
    title: "Criminal Sale of a Firearm Class 3",
    description: "Unlawful sale, or purchase, of a Class 3 firearm when a person does not have a valid license.",
    burdenOfProof: " Sale OR Purchase of a Class 3",
    months: 90,
    fine: 15000,
    category: ChargeCategory.FELONY
  },
  {
    id: "robbery_principal",
    code: "",
    title: "Robbery",
    description: "The taking of personal property from a citizen, business, private residence or vehicle by means of force or fear, against the owners’ consent.",
    burdenOfProof: "The taking of personal property without consent\nThe item was taken from another person, business, residence or vehicle\nUse of force or fear",
    months: 20,
    fine: 1600,
    category: ChargeCategory.MISDEMEANOR
  },
  {
    id: "robbery_accessory",
    code: "",
    title: "Robbery (Accessory)",
    description: "Assisting in the taking of personal property from a citizen, business, private residence or vehicle by means of force or fear, against the owners’ consent.",
    burdenOfProof: "The taking of personal property without consent\nThe item was taken from another person, business, residence or vehicle\nUse of force or fear",
    months: 15,
    fine: 1200,
    category: ChargeCategory.MISDEMEANOR
  },
  {
    id: "robbery_attempted",
    code: "",
    title: "Robbery (Attempted)",
    description: "The attempted taking of personal property from a citizen, business, private residence, or vehicle through force or fear, against the owner's consent.",
    burdenOfProof: "The taking of personal property without consent\nThe item was taken from another person, business, residence or vehicle\nUse of force or fear",
    months: 10,
    fine: 1000,
    category: ChargeCategory.MISDEMEANOR
  },
  {
    id: "robbery_conspiracy",
    code: "",
    title: "Robbery (Conspiracy)",
    description: "Two or more individuals agreeing, planning, or preparing to unlawfully take personal property from a citizen, business, private residence, or vehicle through force or fear, against the owner's consent ----- regardless of whether the robbery was ultimately attempted or completed.",
    burdenOfProof: "The taking of personal property without consent\nThe item was taken from another person, business, residence or vehicle\nUse of force or fear",
    months: 5,
    fine: 800,
    category: ChargeCategory.MISDEMEANOR
  },
  {
    id: "aggravated_robbery_principal",
    code: "",
    title: "Aggravated Robbery",
    description: "A robbery in which the victim, a hostage, or a third party otherwise uninvolved in the crime is physically injured",
    burdenOfProof: "The taking of personal property without consent\nThe item was taken from another person, business, residence or vehicle.\nResulting in an injury of another individual through use of a weapon",
    months: 25,
    fine: 3000,
    category: ChargeCategory.FELONY
  },
  {
    id: "aggravated_robbery_accessory",
    code: "",
    title: "Aggravated Robbery (Accessory)",
    description: "A Person who assists, plans, or otherwise aids another in the act of injuring a victim, hostage or third party during a robbery.",
    burdenOfProof: "The taking of personal property without consent\nThe item was taken from another person, business, residence or vehicle.\nResulting in an injury of another individual through use of a weapon",
    months: 20,
    fine: 2000,
    category: ChargeCategory.FELONY
  },
  {
    id: "aggravated_robbery_attempted",
    code: "",
    title: "Aggravated Robbery (Attempted)",
    description: "The defendant took substantial steps toward committing the robbery but did not complete the act (e.g., entering with weapon drawn, demanding items, but fleeing before taking anything).",
    burdenOfProof: "The taking of personal property without consent\nThe item was taken from another person, business, residence or vehicle.\nResulting in an injury of another individual through use of a weapon",
    months: 15,
    fine: 2000,
    category: ChargeCategory.FELONY
  },
  {
    id: "aggravated_robbery_conspiracy",
    code: "",
    title: "Aggravated Robbery (Conspiracy)",
    description: "Two or more individuals agreeing to commit the robbery, whether or not the attempt was carried out.",
    burdenOfProof: "The taking of personal property without consent\nThe item was taken from another person, business, residence or vehicle.\nResulting in an injury of another individual through use of a weapon",
    months: 15,
    fine: 1500,
    category: ChargeCategory.FELONY
  },
  {
    id: "unlawful_display_of_a_weapon_principal",
    code: "",
    title: "Unlawful Display of a Weapon",
    description: "The carrying or public display of a firearm or deadly weapon in areas where weapons are prohibited by law, such as government buildings, city parks, or private premises that have clearly posted restrictions against the possession of weapons. This includes wearing a weapon on the back, carrying it in hand, or otherwise exhibiting it in a restricted area.",
    burdenOfProof: "The defendant was in possession of a firearm or deadly weapon.\nThe weapon was visibly worn or carried in a restricted area (e.g., government buildings, city parks, or premises with posted \"no weapons\" signs).\nThe defendant was aware or should have reasonably been aware of the weapon restrictions in the area.",
    months: 0,
    fine: 500,
    category: ChargeCategory.MISDEMEANOR
  },
  {
    id: "possession_with_intent_to_distribute_oxy_principal",
    code: "",
    title: "Possession with Intent to Distribute (Oxy)",
    description: "Any person who is found to have large quantities of controlled substances on their person, vehicle or property.",
    burdenOfProof: " Possess large quantity of controlled substances\n20 or more oxy. \n Inferred distribution through circumstance of discovery, pattern of behavior, large sums of money, high grade weaponry, or measuring/packing paraphernalia",
    months: 30,
    fine: 700,
    category: ChargeCategory.FELONY
  },
  {
    id: "possession_with_intent_to_distribute_oxy_accessory",
    code: "",
    title: "Possession with Intent to Distribute (Oxy) (Accessory)",
    description: "Any person who has aided anyone found to have large quantities of controlled substances on their person, vehicle or property.",
    burdenOfProof: " Possess large quantity of controlled substances\n20 or more oxy. \n Inferred distribution through circumstance of discovery, pattern of behavior, large sums of money, high grade weaponry, or measuring/packing paraphernalia",
    months: 25,
    fine: 500,
    category: ChargeCategory.FELONY
  },
  {
    id: "possession_with_intent_to_distribute_oxy_conspiracy",
    code: "",
    title: "Possession with Intent to Distribute (Oxy) (Conspiracy)",
    description: "The planning or preparation which has involved physical steps to acquire or arrange the distribution of large quantities of controlled substances.",
    burdenOfProof: " Possess large quantity of controlled substances\n20 or more oxy. \n Inferred distribution through circumstance of discovery, pattern of behavior, large sums of money, high grade weaponry, or measuring/packing paraphernalia",
    months: 20,
    fine: 400,
    category: ChargeCategory.FELONY
  },
  {
    id: "driving_without_a_license_principal",
    code: "",
    title: "Driving Without a License",
    description: "The unlawful operation of a motor vehicle by an individual who does not possess a valid driver's license, has had their license revoked or suspended, or fails to produce a license when requested by law enforcement.",
    burdenOfProof: "The defendant was operating a motor vehicle at the time of the stop or arrest.\nAND\nThe defendant did not possess a valid driver's license or failed to provide it when requested by law enforcement.\nOR\n The defendant's license had been suspended, revoked, or never issued by the appropriate authority.",
    months: 0,
    fine: 1000,
    category: ChargeCategory.MISDEMEANOR
  },
  {
    id: "driving_under_the_influence_dui_principal",
    code: "",
    title: "Driving Under the Influence (DUI)",
    description: "Actively drove while impaired by alcohol.",
    burdenOfProof: "The defendant was operating a motor vehicle on a public roadway\nAND \nThe defendant showed signs of impairment due to alcohol or drugs\n AND \nThe behavior disrupted the peace, violated traffic safety, or posed risk to themselves or others",
    months: 15,
    fine: 1500,
    category: ChargeCategory.MISDEMEANOR
  },
  {
    id: "driving_under_the_influence_dui_attempted",
    code: "",
    title: "Driving Under the Influence (DUI) (Attempted)",
    description: "Was in the driver's seat or operating the vehicle while impaired, but stopped or caught before driving off",
    burdenOfProof: "The defendant was operating a motor vehicle on a public roadway\nAND \nThe defendant showed signs of impairment due to alcohol or drugs\n AND \nThe behavior disrupted the peace, violated traffic safety, or posed risk to themselves or others",
    months: 5,
    fine: 750,
    category: ChargeCategory.CITATION
  },
  {
    id: "driving_under_the_influence_dui_accessory",
    code: "",
    title: "Driving Under the Influence (DUI) (Accessory)",
    description: "Enabled or encouraged impaired driving (e.g., handed over keys to intoxicated person).",
    burdenOfProof: "The defendant was operating a motor vehicle on a public roadway\nAND \nThe defendant showed signs of impairment due to alcohol or drugs\n AND \nThe behavior disrupted the peace, violated traffic safety, or posed risk to themselves or others",
    months: 5,
    fine: 500,
    category: ChargeCategory.CITATION
  },
  {
    id: "bribery_principal",
    code: "",
    title: "Bribery",
    description: "The unlawful giving or receiving of money, favors, services, or other forms of influence with the intent to alter the actions, decisions, or judgment of a public official, law enforcement, or any individual in a position of authority.",
    burdenOfProof: "The defendant either offered, gave, or accepted something of value (money, favors, services, etc.).\nThe offer was made with the intent to influence the actions, decisions, or judgment of a person in a position of authority.\nThe defendant's intent was to secure preferential treatment, avoid legal consequences, or gain an improper advantage.",
    months: 20,
    fine: 3000,
    category: ChargeCategory.FELONY
  },
  {
    id: "bribery_attempted",
    code: "",
    title: "Bribery (Attempted)",
    description: "The unlawful offering or solicitation of money , favors, services, or other forms of influence with the intent to alter the actions, decisions, or judgment of a public official, law enforcement, or any individual in a position of authority.",
    burdenOfProof: "The defendant either offered, gave, or accepted something of value (money, favors, services, etc.).\nThe offer was made with the intent to influence the actions, decisions, or judgment of a person in a position of authority.\nThe defendant's intent was to secure preferential treatment, avoid legal consequences, or gain an improper advantage.",
    months: 10,
    fine: 1500,
    category: ChargeCategory.MISDEMEANOR
  },
  {
    id: "felony_obstruction_of_justice_principal",
    code: "",
    title: "Felony Obstruction of Justice",
    description: "The act of deliberately and significantly obstructing or impeding the duties of law enforcement officers, judges, or other government officials in the performance of their legal responsibilities. This includes providing false evidence, destroying material evidence, or dissuading a witness from testifying.",
    burdenOfProof: "1 of the following is necessary to meet the burden.\nThe defendant knowingly and intentionally provided false or misleading information to law enforcement, the court, or other officials.\nThe defendant's actions substantially hindered or prevented law enforcement or officials from carrying out their duties.\nExamples include offering false evidence, destroying material evidence, or dissuading a witness from testifying.",
    months: 60,
    fine: 1000,
    category: ChargeCategory.FELONY
  },
  {
    id: "involuntary_vehicular_manslaughter_principal",
    code: "",
    title: "Involuntary / Vehicular Manslaughter",
    description: "Causing unintentional death of a person due to gross negligence, recklessness or carelessness.",
    burdenOfProof: "The defendant acted carelessly or negligently.\nThe negligence or carelessness by the defendant led to the person’s death.",
    months: 300,
    fine: 7500,
    category: ChargeCategory.FELONY
  },
  {
    id: "misdemeanor_obstruction_of_justice_principal",
    code: "",
    title: "Misdemeanor Obstruction of Justice",
    description: "The act of intentionally obstructing or interfering with law enforcement officers in the performance of their duties, in a minor capacity. This includes actions that disrupt but do not significantly hinder the enforcement of the law or the arrest of another individual.",
    burdenOfProof: "The defendant intentionally disrupted or impeded the actions of a law enforcement officer.\nThe interference was not substantial enough to prevent the officer from carrying out their duties but caused a minor delay or disruption.\nExamples may include minor verbal or physical actions that momentarily impede law enforcement activities without escalating to major offenses.",
    months: 10,
    fine: 500,
    category: ChargeCategory.MISDEMEANOR
  },
  {
    id: "possession_of_controlled_substance_cocaine_principal_1",
    code: "",
    title: "Possession of Controlled Substance (Cocaine)",
    description: "Any person found to have 20+ Cocaine on their person or 1+ Cocaine Brick on their person.",
    burdenOfProof: " Possesses Cocaine in any form",
    months: 90,
    fine: 13000,
    category: ChargeCategory.FELONY
  },
  {
    id: "possession_of_controlled_substance_cocaine_principal_2",
    code: "",
    title: "Possession of Controlled Substance (Cocaine)",
    description: "Any person found to have 10+ Cocaine on their person.",
    burdenOfProof: " Possesses Cocaine in any form",
    months: 55,
    fine: 10000,
    category: ChargeCategory.FELONY
  },
  {
    id: "possession_of_controlled_substance_cocaine_principal_3",
    code: "",
    title: "Possession of Controlled Substance (Cocaine)",
    description: "Any person found to have 1+ Cocaine on their person.",
    burdenOfProof: " Possesses Cocaine in any form",
    months: 25,
    fine: 4000,
    category: ChargeCategory.FELONY
  },
  {
    id: "manufacture_of_controlled_substance_cocaine_principal",
    code: "",
    title: "Manufacture of Controlled Substance (Cocaine)",
    description: "Planning to prepare, compound, or process Cocaine",
    burdenOfProof: "The defendant was involved in the production, preparation, or processing of a controlled substance.\nIt is illegal to possess the controlled substance in question.\nThe defendant did not have legal authorization or justification to manufacture the substance",
    months: 150,
    fine: 20000,
    category: ChargeCategory.FELONY
  },
  {
    id: "manufacture_of_controlled_substance_cocaine_accessory",
    code: "",
    title: "Manufacture of Controlled Substance (Cocaine) (Accessory)",
    description: "The unlawful production, preparation, compounding, or processing of Cocaine.",
    burdenOfProof: "The defendant was involved in the production, preparation, or processing of a controlled substance.\nIt is illegal to possess the controlled substance in question.\nThe defendant did not have legal authorization or justification to manufacture the substance",
    months: 100,
    fine: 15000,
    category: ChargeCategory.FELONY
  },
  {
    id: "manufacture_of_controlled_substance_cocaine_conspiracy",
    code: "",
    title: "Manufacture of Controlled Substance (Cocaine) (Conspiracy)",
    description: "Assisting in the unlawful production, preparation, compounding, or processing of Cocaine.",
    burdenOfProof: "The defendant was involved in the production, preparation, or processing of a controlled substance.\nIt is illegal to possess the controlled substance in question.\nThe defendant did not have legal authorization or justification to manufacture the substance",
    months: 50,
    fine: 500,
    category: ChargeCategory.FELONY
  },
  {
    id: "torture_court_charge_principal",
    code: "",
    title: "Torture - COURT CHARGE",
    description: "Intentionally causing cruel or extreme pain and suffering to a person.",
    burdenOfProof: "Intentionally caused extreme physical or mental pain or suffering\nWas carried out for a specific purpose",
    months: 720,
    fine: 8000,
    category: ChargeCategory.FELONY
  },
  {
    id: "torture_court_charge_accessory",
    code: "",
    title: "Torture - COURT CHARGE (Accessory)",
    description: "Assisting in causing cruel or extreme pain and suffering to a person.",
    burdenOfProof: "Intentionally caused extreme physical or mental pain or suffering\nWas carried out for a specific purpose",
    months: 540,
    fine: 5000,
    category: ChargeCategory.FELONY
  },
  {
    id: "torture_court_charge_conspiracy",
    code: "",
    title: "Torture - COURT CHARGE (Conspiracy)",
    description: "Anyone who plans or makes a substantial effort to cause cruel or extreme pain and suffering to a person.",
    burdenOfProof: "Intentionally caused extreme physical or mental pain or suffering\nWas carried out for a specific purpose",
    months: 540,
    fine: 3000,
    category: ChargeCategory.FELONY
  },
  {
    id: "illegal_poaching_principal",
    code: "",
    title: "Illegal Poaching",
    description: "Knowingly killed or captured a protected species in violation of hunting laws. Applies to big game (e.g., mountain lions, gorillas), exotic species, or domesticated pets",
    burdenOfProof: "The defendant killed, captured, or attempted to hunt a protected species \nThey did so without a legal hunting permit, outside allowed areas/seasons, or by unlawful means \nThe act was not in self-defense from immediate danger of permanent injury.",
    months: 50,
    fine: 7000,
    category: ChargeCategory.FELONY
  },
  {
    id: "illegal_poaching_accessory",
    code: "",
    title: "Illegal Poaching (Accessory)",
    description: "Transported, assisted, scouted, or processed the carcass or capture of a protected species for someone else.",
    burdenOfProof: "The defendant killed, captured, or attempted to hunt a protected species \nThey did so without a legal hunting permit, outside allowed areas/seasons, or by unlawful means \nThe act was not in self-defense from immediate danger of permanent injury.",
    months: 30,
    fine: 5000,
    category: ChargeCategory.FELONY
  },
  {
    id: "illegal_poaching_attempted",
    code: "",
    title: "Illegal Poaching (Attempted)",
    description: "Was caught in the process of unlawfully hunting a protected species, but no animal was harmed or captured.",
    burdenOfProof: "The defendant killed, captured, or attempted to hunt a protected species \nThey did so without a legal hunting permit, outside allowed areas/seasons, or by unlawful means \nThe act was not in self-defense from immediate danger of permanent injury.",
    months: 20,
    fine: 3500,
    category: ChargeCategory.MISDEMEANOR
  },
  {
    id: "illegal_poaching_conspiracy",
    code: "",
    title: "Illegal Poaching (Conspiracy)",
    description: "Planned or coordinated with others to engage in unlawful poaching ----- Including baiting, tracking, or arranging illegal hunting parties.",
    burdenOfProof: "The defendant killed, captured, or attempted to hunt a protected species \nThey did so without a legal hunting permit, outside allowed areas/seasons, or by unlawful means \nThe act was not in self-defense from immediate danger of permanent injury.",
    months: 20,
    fine: 2500,
    category: ChargeCategory.MISDEMEANOR
  },
  {
    id: "improper_use_of_311_services_principal",
    code: "",
    title: "Improper Use of 311 Services",
    description: "The person who misused or spammed the 311 system.",
    burdenOfProof: "The defendant made a 311 report or series of reports. \nThe report(s) were knowingly false, excessive, or made in bad faith. \nThe misuse interfered with or distracted public services. ",
    months: 5,
    fine: 500,
    category: ChargeCategory.CITATION
  },
  {
    id: "hunting_without_a_license_or_proper_firearm_principal",
    code: "",
    title: "Hunting without a License or proper firearm",
    description: "Any person to be found hunting, with or without a rifle, in designated hunting areas without a valid hunting license.",
    burdenOfProof: "Does not possess a valid hunting license AND\nFound with any amount of unprocessed meats\nOR\nHunting with an unauthorized weapon",
    months: 20,
    fine: 750,
    category: ChargeCategory.MISDEMEANOR
  },
  {
    id: "poaching_principal",
    code: "",
    title: "Poaching",
    description: "Any person found hunting outside of designated hunting areas.",
    burdenOfProof: "Found outside of designated hunting areas\nFound with materials for hunting and unprocessed meats\nEstablished evidence the hunting was conducted outside of the designated zones",
    months: 35,
    fine: 3500,
    category: ChargeCategory.FELONY
  },
  {
    id: "failure_to_obey_lawful_order_principal",
    code: "",
    title: "Failure to obey lawful order",
    description: "An individual who actively refuses to act from a lawfully given order from a Law Enforcement Officer",
    burdenOfProof: "An individual who actively refuses to act from a lawfully given order from a Law Enforcement Officer",
    months: 5,
    fine: 300,
    category: ChargeCategory.MISDEMEANOR
  },
  {
    id: "improper_use_of_a_vehicle_principal",
    code: "",
    title: "Improper Use of a Vehicle",
    description: "Driver of the vehicle",
    burdenOfProof: "The defendant operated a vehicle outside of standard legal use. \nThe conduct presented a safety risk or violated normal public use. ",
    months: 15,
    fine: 750,
    category: ChargeCategory.MISDEMEANOR
  },
  {
    id: "improper_use_of_a_vehicle_accessory",
    code: "",
    title: "Improper Use of a Vehicle (Accessory)",
    description: "A person who knowingly encouraged or supported the behaviour",
    burdenOfProof: "The defendant operated a vehicle outside of standard legal use. \nThe conduct presented a safety risk or violated normal public use. ",
    months: 0,
    fine: 400,
    category: ChargeCategory.CITATION
  },
  {
    id: "graft_court_charge_principal",
    code: "",
    title: "Graft - COURT CHARGE",
    description: "The person who either committed the act of graft themselves or directed, coerced, or forced a government official to commit the act on their behalf.",
    burdenOfProof: "The defendant had access to public funds, records, or resources due to a government position or unauthorized access. \nThe defendant used or redirected those funds or resources for personal gain or to unlawfully protect themselves or others. \nThe action was intentional and without lawful justification. ",
    months: 4320,
    fine: 75000,
    category: ChargeCategory.FELONY
  },
  {
    id: "graft_court_charge_accessory",
    code: "",
    title: "Graft - COURT CHARGE (Accessory)",
    description: "Someone who knowingly aided, enabled, or covered up an act of graft.",
    burdenOfProof: "The defendant had access to public funds, records, or resources due to a government position or unauthorized access. \nThe defendant used or redirected those funds or resources for personal gain or to unlawfully protect themselves or others. \nThe action was intentional and without lawful justification. ",
    months: 1440,
    fine: 40000,
    category: ChargeCategory.FELONY
  },
  {
    id: "graft_court_charge_attempted",
    code: "",
    title: "Graft - COURT CHARGE (Attempted)",
    description: "The defendant took steps toward committing graft (e.g. logging into restricted systems or initiating fund transfers) but the act was not fully carried out.",
    burdenOfProof: "The defendant had access to public funds, records, or resources due to a government position or unauthorized access. \nThe defendant used or redirected those funds or resources for personal gain or to unlawfully protect themselves or others. \nThe action was intentional and without lawful justification. ",
    months: 1440,
    fine: 40000,
    category: ChargeCategory.FELONY
  },
  {
    id: "graft_court_charge_conspiracy",
    code: "",
    title: "Graft - COURT CHARGE (Conspiracy)",
    description: "Two or more people planning or agreeing to misuse government resources or funds, regardless of whether the act was completed.",
    burdenOfProof: "The defendant had access to public funds, records, or resources due to a government position or unauthorized access. \nThe defendant used or redirected those funds or resources for personal gain or to unlawfully protect themselves or others. \nThe action was intentional and without lawful justification. ",
    months: 600,
    fine: 25000,
    category: ChargeCategory.FELONY
  },
  {
    id: "possession_of_illegal_weapon_modification_equipment_principal",
    code: "",
    title: "Possession of Illegal Weapon Modification Equipment",
    description: "An individual in possession of a firearm with performance modification attachments and/or in possession of firearm modification equipment without proper license",
    burdenOfProof: "An individual in possession of a firearm with performance modification attachments and/or in possession of firearm modification equipment without proper license",
    months: 40,
    fine: 2000,
    category: ChargeCategory.FELONY
  },
  {
    id: "hunting_over_limits_principal_1",
    code: "",
    title: "Hunting Over Limits",
    description: "Any person found hunting over the bag limit in designated hunting areas. (60+)",
    burdenOfProof: "Found in possession of 41 or more units of unprocessed meats\nFound with all necessary materials needed to go hunting\nIs not part of a transportation company or meat service industry",
    months: 10,
    fine: 3000,
    category: ChargeCategory.MISDEMEANOR
  },
  {
    id: "hunting_over_limits_principal_2",
    code: "",
    title: "Hunting Over Limits",
    description: "Any person found hunting over the bag limit in designated hunting areas. (50+)",
    burdenOfProof: "Found in possession of 41 or more units of unprocessed meats\nFound with all necessary materials needed to go hunting\nIs not part of a transportation company or meat service industry",
    months: 0,
    fine: 2000,
    category: ChargeCategory.CITATION
  },
  {
    id: "hunting_over_limits_principal_3",
    code: "",
    title: "Hunting Over Limits",
    description: "Any person found hunting over the bag limit in designated hunting areas. (41+)",
    burdenOfProof: "Found in possession of 41 or more units of unprocessed meats\nFound with all necessary materials needed to go hunting\nIs not part of a transportation company or meat service industry",
    months: 0,
    fine: 1000,
    category: ChargeCategory.CITATION
  },
  {
    id: "failure_to_wear_ppe_principal",
    code: "",
    title: "Failure to wear PPE",
    description: "Any person working in a position that would require protective apparel and fails to wear them",
    burdenOfProof: "Working a job requiring protective apparel and the person is not in that attire in the job type or job vehicle\nEmergency Services are exempt for the scale of their duty",
    months: 0,
    fine: 250,
    category: ChargeCategory.CITATION
  },
  {
    id: "smuggling_international_goods_principal",
    code: "",
    title: "Smuggling International Goods",
    description: "An individual found with goods not sold domestically in San Andreas being imported by non-official means.",
    burdenOfProof: "Was found with an abundance of general goods, drugs, or firearms\nWas found to be crossing San Andreas borders with these items\nFailed to produce any verified and reputable manifest or import order\nWas found near the coast of San Andreas, in the waters of San Andreas, or the Airspace of San Andreas",
    months: 80,
    fine: 9000,
    category: ChargeCategory.FELONY
  },
  {
    id: "open_display_of_weaponry_in_a_government_or_private_facility_principal",
    code: "",
    title: "Open Display of Weaponry in a Government or Private Facility",
    description: "Any person found publicly displaying any form of weaponry in a government or private facility",
    burdenOfProof: "Was found with a weapon on their back, hip, leg, or other part of their body\nWas asked to properly store the weapon either on their person or in their vehicle by the owner, worker, or enforcement officer",
    months: 15,
    fine: 1000,
    category: ChargeCategory.MISDEMEANOR
  },
  {
    id: "failure_to_remove_a_mask_in_a_government_or_private_building_principal",
    code: "",
    title: "Failure to Remove a Mask in a Government or Private Building",
    description: "Any person wearing a mask inside of a government building.",
    burdenOfProof: "Was found wearing a mask inside of a government or private facility\nWas asked to remove it by the owner, worker, or enforcement officer",
    months: 10,
    fine: 500,
    category: ChargeCategory.CITATION
  },
  {
    id: "criminal_possession_of_a_firearm_class_1_principal",
    code: "",
    title: "Criminal Possession of a Firearm Class 1",
    description: "Possess a Class 1 weapon without license or a weapon not registered to the individual in possession.",
    burdenOfProof: "Possesses Class 1 weapon\nPistols, including semi-automatic pistol variations.\nHunting Rifles\nDoes not have a weapons license and/or weapon is not registered to them",
    months: 10,
    fine: 500,
    category: ChargeCategory.FELONY
  },
  {
    id: "unlawful_possession_of_chemical_or_biological_agents_court_charge_principal",
    code: "",
    title: "Unlawful Possession of Chemical or Biological Agents - COURT CHARGE",
    description: "Possessed or transported dangerous chemicals or biological agents unlawfully",
    burdenOfProof: "The defendant was in possession of a chemical, biological, or toxic substance. \nThe substance was capable of causing serious harm, death, or incapacitation. \nThe defendant had no legal, medical, or occupational justification to possess it. ",
    months: 7200,
    fine: 10000,
    category: ChargeCategory.FELONY
  },
  {
    id: "unlawful_possession_of_chemical_or_biological_agents_court_charge_accessory",
    code: "",
    title: "Unlawful Possession of Chemical or Biological Agents - COURT CHARGE (Accessory)",
    description: "Aided in the acquiring, hiding, or transporting the substances",
    burdenOfProof: "The defendant was in possession of a chemical, biological, or toxic substance. \nThe substance was capable of causing serious harm, death, or incapacitation. \nThe defendant had no legal, medical, or occupational justification to possess it. ",
    months: 5759,
    fine: 7500,
    category: ChargeCategory.FELONY
  },
  {
    id: "unlawful_possession_of_chemical_or_biological_agents_court_charge_attempted",
    code: "",
    title: "Unlawful Possession of Chemical or Biological Agents - COURT CHARGE (Attempted)",
    description: "Took substantial steps to acquire or use such substances but failed or was stopped",
    burdenOfProof: "The defendant was in possession of a chemical, biological, or toxic substance. \nThe substance was capable of causing serious harm, death, or incapacitation. \nThe defendant had no legal, medical, or occupational justification to possess it. ",
    months: 4320,
    fine: 7500,
    category: ChargeCategory.FELONY
  },
  {
    id: "unlawful_possession_of_chemical_or_biological_agents_court_charge_conspiracy",
    code: "",
    title: "Unlawful Possession of Chemical or Biological Agents - COURT CHARGE (Conspiracy)",
    description: "Planned or agreed to obtain or use such substances unlawfully",
    burdenOfProof: "The defendant was in possession of a chemical, biological, or toxic substance. \nThe substance was capable of causing serious harm, death, or incapacitation. \nThe defendant had no legal, medical, or occupational justification to possess it. ",
    months: 1440,
    fine: 5000,
    category: ChargeCategory.FELONY
  },
  {
    id: "drug_trafficking_court_charge_principal",
    code: "",
    title: "Drug Trafficking (COURT CHARGE)",
    description: "An individual with enough paraphernalia or controlled substances that would infer a higher level of distribution for financial gain or status. Any item in the form of a packaged brick with be considered 10 counts.",
    burdenOfProof: "More than 80 counts of controlled substances found on their possession or property \nOR \n11+ packages of controlled substances, commonly referred to as bricks \nInferred high level distribution through circumstance of discovery, pattern of behavior, large sums of money, high grade weaponry, or measuring/packing paraphernalia ",
    months: 800,
    fine: 20000,
    category: ChargeCategory.FELONY
  },
  {
    id: "drug_trafficking_court_charge_accessory",
    code: "",
    title: "Drug Trafficking (COURT CHARGE) (Accessory)",
    description: "Aiding an individual with enough paraphernalia or controlled substances that would infer a higher level of distribution for financial gain or status. Any item in the form of a packaged brick will be considered 10 counts.",
    burdenOfProof: "More than 80 counts of controlled substances found on their possession or property \nOR \n11+ packages of controlled substances, commonly referred to as bricks \nInferred high level distribution through circumstance of discovery, pattern of behavior, large sums of money, high grade weaponry, or measuring/packing paraphernalia ",
    months: 350,
    fine: 7500,
    category: ChargeCategory.FELONY
  },
  {
    id: "possession_of_government_vehicle_principal",
    code: "",
    title: "Possession of Government Vehicle",
    description: "The unlawful possession of government vehicle(s) for use by government or emergency personnel, including but not limited to vehicles, spike strips, medical supplies, or other official equipment, without proper authorization or legal justification.",
    burdenOfProof: "The defendant was found in possession of  vehicles typically used by government officials or emergency personnel.\nThe defendant did not have authorization or legal justification to possess such vehicle.\n﻿",
    months: 30,
    fine: 10000,
    category: ChargeCategory.FELONY
  },
  {
    id: "illegally_parked_in_a_handicapped_space_principal",
    code: "",
    title: "Illegally Parked in a Handicapped Space",
    description: "Unlawfully parked in a space reserved for handicapped individuals without legal authorization or permit.",
    burdenOfProof: "The vehicle was parked in a clearly marked handicapped parking space.\n AND \nThe driver or registered owner did not possess a valid handicapped parking permit or an official medical designation on record.",
    months: 0,
    fine: 1000,
    category: ChargeCategory.CITATION
  },
  {
    id: "terrorism_court_charge_principal",
    code: "",
    title: "Terrorism (Court Charge)",
    description: "The act or acts of unified and significant destruction of public, private, or governmental property with a wanton disregard for safety of persons and an inherent disregard for life or limb with a clearly described agenda of political influence or fear mongering to an audience.",
    burdenOfProof: "Individuals were apprehended in unison to the event\n\nThe individuals utilized weaponry, vehicles, or other destructive means to enact violence upon areas\nMass destruction was caused via the events caused by the entire group",
    months: 4320,
    fine: 50000,
    category: ChargeCategory.FELONY
  },
  {
    id: "insurrection_or_sedition_court_charge_principal",
    code: "",
    title: "Insurrection or Sedition - COURT CHARGE",
    description: "Led or took part in the act of insurrection.",
    burdenOfProof: "The defendant took part in or encouraged an organized act against the government or its institutions. \nThe intent was to overthrow or destabilize lawful authority or create chaos. \nThe act involved weapons, organized planning, or attacks on government facilities or officials. ",
    months: 2880,
    fine: 25000,
    category: ChargeCategory.FELONY
  },
  {
    id: "insurrection_or_sedition_court_charge_accessory",
    code: "",
    title: "Insurrection or Sedition - COURT CHARGE (Accessory)",
    description: "Aided or supported the group or actions.",
    burdenOfProof: "The defendant took part in or encouraged an organized act against the government or its institutions. \nThe intent was to overthrow or destabilize lawful authority or create chaos. \nThe act involved weapons, organized planning, or attacks on government facilities or officials. ",
    months: 2880,
    fine: 20000,
    category: ChargeCategory.FELONY
  },
  {
    id: "insurrection_or_sedition_court_charge_attempted",
    code: "",
    title: "Insurrection or Sedition - COURT CHARGE (Attempted)",
    description: "Took substantial steps but was stopped or failed to execute the act.",
    burdenOfProof: "The defendant took part in or encouraged an organized act against the government or its institutions. \nThe intent was to overthrow or destabilize lawful authority or create chaos. \nThe act involved weapons, organized planning, or attacks on government facilities or officials. ",
    months: 1440,
    fine: 10000,
    category: ChargeCategory.FELONY
  },
  {
    id: "insurrection_or_sedition_court_charge_conspiracy",
    code: "",
    title: "Insurrection or Sedition - COURT CHARGE (Conspiracy)",
    description: "Helped plan or organize the insurrection.",
    burdenOfProof: "The defendant took part in or encouraged an organized act against the government or its institutions. \nThe intent was to overthrow or destabilize lawful authority or create chaos. \nThe act involved weapons, organized planning, or attacks on government facilities or officials. ",
    months: 720,
    fine: 10000,
    category: ChargeCategory.FELONY
  },
  {
    id: "possession_of_government_equipment_principal",
    code: "",
    title: "Possession of Government Equipment",
    description: "The unlawful possession of equipment, or supplies designated for use by government or emergency personnel, including but not limited to firearms, spike strips, medical supplies, or other official equipment, without proper authorization or legal justification.",
    burdenOfProof: "The defendant was found in possession of equipment, supplies, typically used by government officials or emergency personnel.\nThe defendant did not have authorization or legal justification to possess such equipment.\nThe equipment in question is specifically designated for government or emergency personnel use.",
    months: 120,
    fine: 75000,
    category: ChargeCategory.FELONY
  },
  {
    id: "joyriding_principal",
    code: "",
    title: "Joyriding",
    description: "Unlawfully taking a vehicle belonging to another or driving the vehicle without the owner's consent.",
    burdenOfProof: "Person is possession of a vehicle that is not theirs\n\n\nThe owner of the vehicle did not give consent to the person in possession\n﻿",
    months: 15,
    fine: 800,
    category: ChargeCategory.MISDEMEANOR
  },
  {
    id: "joyriding_accessory",
    code: "",
    title: "Joyriding (Accessory)",
    description: "A person who assists, plans, aids in the act of unlawfully taking a vehicle belonging to another.",
    burdenOfProof: "Person is possession of a vehicle that is not theirs\n\n\nThe owner of the vehicle did not give consent to the person in possession\n﻿",
    months: 10,
    fine: 500,
    category: ChargeCategory.MISDEMEANOR
  },
  {
    id: "public_intoxication_principal",
    code: "",
    title: "Public Intoxication",
    description: "The person who was intoxicated and disruptive in public",
    burdenOfProof: "The defendant was in a public place. \nThe defendant showed visible signs of intoxication. \nThe behavior disrupted the peace or created safety concerns ",
    months: 5,
    fine: 500,
    category: ChargeCategory.CITATION
  },
  {
    id: "public_intoxication_accessory",
    code: "",
    title: "Public Intoxication (Accessory)",
    description: "A person who encouraged the intoxicated behavior or created the enviornment (e.g.. serving open alcohol in a public park).",
    burdenOfProof: "The defendant was in a public place. \nThe defendant showed visible signs of intoxication. \nThe behavior disrupted the peace or created safety concerns ",
    months: 0,
    fine: 250,
    category: ChargeCategory.CITATION
  },
  {
    id: "jaywalking_principal",
    code: "",
    title: "Jaywalking",
    description: "The individual who unlawfully crossed the roadway as described.",
    burdenOfProof: "The defendant crossed a road where no crosswalk or intersection was present, or \nCrossed against a clear traffic signal (e.g., red hand or “Do Not Walk”), and \nThe act caused or had the potential to cause a safety hazard for vehicles or pedestrians. ",
    months: 0,
    fine: 250,
    category: ChargeCategory.CITATION
  },
  {
    id: "cybercrime_infrastructure_sabotage_court_charge_principal",
    code: "",
    title: "Cybercrime – Infrastructure Sabotage - COURT CHARGE",
    description: "Hacked or manipulated critical systems.",
    burdenOfProof: "The defendant accessed or attempted to access secure digital infrastructure. \nThe act caused disruption, damage, or unauthorized control of public systems. \nThe action was not authorized or permitted in any legal or occupational capacity. ",
    months: 1440,
    fine: 20000,
    category: ChargeCategory.FELONY
  },
  {
    id: "cybercrime_infrastructure_sabotage_court_charge_accessory",
    code: "",
    title: "Cybercrime – Infrastructure Sabotage - COURT CHARGE (Accessory)",
    description: "Provided tools, information, or support for the cyberattack.",
    burdenOfProof: "The defendant accessed or attempted to access secure digital infrastructure. \nThe act caused disruption, damage, or unauthorized control of public systems. \nThe action was not authorized or permitted in any legal or occupational capacity. ",
    months: 1220,
    fine: 18000,
    category: ChargeCategory.FELONY
  },
  {
    id: "cybercrime_infrastructure_sabotage_court_charge_attempted",
    code: "",
    title: "Cybercrime – Infrastructure Sabotage - COURT CHARGE (Attempted)",
    description: "Tried to breach infrastructure but failed or was blocked.",
    burdenOfProof: "The defendant accessed or attempted to access secure digital infrastructure. \nThe act caused disruption, damage, or unauthorized control of public systems. \nThe action was not authorized or permitted in any legal or occupational capacity. ",
    months: 720,
    fine: 5000,
    category: ChargeCategory.FELONY
  },
  {
    id: "cybercrime_infrastructure_sabotage_court_charge_conspiracy",
    code: "",
    title: "Cybercrime – Infrastructure Sabotage - COURT CHARGE (Conspiracy)",
    description: "Worked with others to plan the attack",
    burdenOfProof: "The defendant accessed or attempted to access secure digital infrastructure. \nThe act caused disruption, damage, or unauthorized control of public systems. \nThe action was not authorized or permitted in any legal or occupational capacity. ",
    months: 720,
    fine: 5000,
    category: ChargeCategory.FELONY
  },
  {
    id: "assault_on_a_government_official_principal",
    code: "",
    title: "Assault on a Government Official",
    description: "New Modifier",
    burdenOfProof: "The defendant knowingly and intentionally assaulted or caused harm to a person employed by the government. \nThe victim was not actively engaging in enforcement or official action against the defendant at the time. \nThe defendant targeted the victim due to their role, employment, or status as a public servant. \nThe assault was unprovoked or retaliatory in nature. ",
    months: 60,
    fine: 3000,
    category: ChargeCategory.FELONY
  },
  {
    id: "assault_on_a_government_official_accessory",
    code: "",
    title: "Assault on a Government Official (Accessory)",
    description: "New Modifier",
    burdenOfProof: "The defendant knowingly and intentionally assaulted or caused harm to a person employed by the government. \nThe victim was not actively engaging in enforcement or official action against the defendant at the time. \nThe defendant targeted the victim due to their role, employment, or status as a public servant. \nThe assault was unprovoked or retaliatory in nature. ",
    months: 55,
    fine: 2500,
    category: ChargeCategory.FELONY
  },
  {
    id: "assault_on_a_government_official_attempted",
    code: "",
    title: "Assault on a Government Official (Attempted)",
    description: "New Modifier",
    burdenOfProof: "The defendant knowingly and intentionally assaulted or caused harm to a person employed by the government. \nThe victim was not actively engaging in enforcement or official action against the defendant at the time. \nThe defendant targeted the victim due to their role, employment, or status as a public servant. \nThe assault was unprovoked or retaliatory in nature. ",
    months: 45,
    fine: 2000,
    category: ChargeCategory.FELONY
  },
  {
    id: "assault_on_a_government_official_conspiracy",
    code: "",
    title: "Assault on a Government Official (Conspiracy)",
    description: "New Modifier",
    burdenOfProof: "The defendant knowingly and intentionally assaulted or caused harm to a person employed by the government. \nThe victim was not actively engaging in enforcement or official action against the defendant at the time. \nThe defendant targeted the victim due to their role, employment, or status as a public servant. \nThe assault was unprovoked or retaliatory in nature. ",
    months: 30,
    fine: 1500,
    category: ChargeCategory.FELONY
  },
  {
    id: "humane_labs_robbery_principal",
    code: "",
    title: "Humane Labs Robbery",
    description: "Any person who is found to actively rob or in any other way attack the facilities of the Humane Labs",
    burdenOfProof: "Possession of humane labs equipment and/or items\nSeen fleeing from within the building after shots were fired\nAnd/Or Use of a weapon within the facility to injure security guards\n﻿\n",
    months: 50,
    fine: 10000,
    category: ChargeCategory.FELONY
  },
  {
    id: "humane_labs_robbery_attempted",
    code: "",
    title: "Humane Labs Robbery (Attempted)",
    description: "Any person who is found attempting to rob or in any other way attack the facilities of the Humane Labs",
    burdenOfProof: "Possession of humane labs equipment and/or items\nSeen fleeing from within the building after shots were fired\nAnd/Or Use of a weapon within the facility to injure security guards\n﻿\n",
    months: 30,
    fine: 7500,
    category: ChargeCategory.FELONY
  },
  {
    id: "humane_labs_robbery_accessory",
    code: "",
    title: "Humane Labs Robbery (Accessory)",
    description: "Any person who has aided anyone in actively robbing or in any other way attacking the facilities of the Humane Labs",
    burdenOfProof: "Possession of humane labs equipment and/or items\nSeen fleeing from within the building after shots were fired\nAnd/Or Use of a weapon within the facility to injure security guards\n﻿\n",
    months: 10,
    fine: 5000,
    category: ChargeCategory.FELONY
  },
  {
    id: "government_trespassing_principal",
    code: "",
    title: "Government Trespassing",
    description: "Any person who is found to be actively trespassing within the Secure Facility or its Grounds",
    burdenOfProof: "The individual was seen leaving or was found inside a secure section of a government facility\n AND \nThe individual did not have legal authorization or consent to be there\n﻿\n\n﻿\n",
    months: 30,
    fine: 10000,
    category: ChargeCategory.FELONY
  },
  {
    id: "government_trespassing_attempted",
    code: "",
    title: "Government Trespassing (Attempted)",
    description: "Any person who is found attempting to tresspass on or within the Secure Facility or its Grounds.",
    burdenOfProof: "The individual was seen leaving or was found inside a secure section of a government facility\n AND \nThe individual did not have legal authorization or consent to be there\n﻿\n\n﻿\n",
    months: 15,
    fine: 7500,
    category: ChargeCategory.FELONY
  },
  {
    id: "government_trespassing_accessory",
    code: "",
    title: "Government Trespassing (Accessory)",
    description: "Any person who has aided anyone in actively trespassing or in any other way tresspassing within a Secure Facility or its Grounds",
    burdenOfProof: "The individual was seen leaving or was found inside a secure section of a government facility\n AND \nThe individual did not have legal authorization or consent to be there\n﻿\n\n﻿\n",
    months: 5,
    fine: 5000,
    category: ChargeCategory.FELONY
  },
  {
    id: "manufacture_of_controlled_substance_marijuana_principal",
    code: "",
    title: "Manufacture of Controlled Substance (Marijuana)",
    description: "The unlawful production, preparation, compounding, or processing of the controlled substance marijuana.",
    burdenOfProof: "The defendant was involved in the production, preparation, or processing of a controlled substance.\nIt is illegal to possess the controlled substance in question.\nThe defendant did not have legal authorization or justification to manufacture the substance",
    months: 70,
    fine: 9000,
    category: ChargeCategory.FELONY
  },
  {
    id: "manufacture_of_controlled_substance_marijuana_accessory",
    code: "",
    title: "Manufacture of Controlled Substance (Marijuana) (Accessory)",
    description: "Assisting in the unlawful production, preparation, compounding, or processing of any controlled substance, including but not limited to narcotics, stimulants, depressants, or other illegal drugs, without proper authorization or legal justification.",
    burdenOfProof: "The defendant was involved in the production, preparation, or processing of a controlled substance.\nIt is illegal to possess the controlled substance in question.\nThe defendant did not have legal authorization or justification to manufacture the substance",
    months: 60,
    fine: 7500,
    category: ChargeCategory.FELONY
  },
  {
    id: "manufacture_of_controlled_substance_marijuana_conspiracy",
    code: "",
    title: "Manufacture of Controlled Substance (Marijuana) (Conspiracy)",
    description: "Planning to prepare, compound, or process any controlled substance, including but not limited to narcotics, stimulants, depressants, or other illegal drugs, without proper authorization or legal justification.",
    burdenOfProof: "The defendant was involved in the production, preparation, or processing of a controlled substance.\nIt is illegal to possess the controlled substance in question.\nThe defendant did not have legal authorization or justification to manufacture the substance",
    months: 45,
    fine: 5000,
    category: ChargeCategory.FELONY
  },
  {
    id: "kidnapping_of_a_government_official_principal",
    code: "",
    title: "Kidnapping of a Government Official",
    description: "The individual who directly kidnapped or restrained the government offical or public servant.",
    burdenOfProof: "The defendant unlawfully restrained, detained, or moved the victim against their will. \nForce, threat, or fear was used to accomplish the act. \nThe victim was a government official, emergency responder, or public employee at the time of the offense. ",
    months: 180,
    fine: 5000,
    category: ChargeCategory.FELONY
  },
  {
    id: "kidnapping_of_a_government_official_accessory",
    code: "",
    title: "Kidnapping of a Government Official (Accessory)",
    description: "A peson who knowingly arristed, planned, or facilitated the kidnapping.",
    burdenOfProof: "The defendant unlawfully restrained, detained, or moved the victim against their will. \nForce, threat, or fear was used to accomplish the act. \nThe victim was a government official, emergency responder, or public employee at the time of the offense. ",
    months: 140,
    fine: 4000,
    category: ChargeCategory.FELONY
  },
  {
    id: "kidnapping_of_a_government_official_attempted",
    code: "",
    title: "Kidnapping of a Government Official (Attempted)",
    description: "Clear steps were taken to kidnap the government offical, but the act was interrupted or failed.",
    burdenOfProof: "The defendant unlawfully restrained, detained, or moved the victim against their will. \nForce, threat, or fear was used to accomplish the act. \nThe victim was a government official, emergency responder, or public employee at the time of the offense. ",
    months: 60,
    fine: 3500,
    category: ChargeCategory.FELONY
  },
  {
    id: "kidnapping_of_a_government_official_conspiracy",
    code: "",
    title: "Kidnapping of a Government Official (Conspiracy)",
    description: "Two or more individuals agreeing to target or kidnap a government offical",
    burdenOfProof: "The defendant unlawfully restrained, detained, or moved the victim against their will. \nForce, threat, or fear was used to accomplish the act. \nThe victim was a government official, emergency responder, or public employee at the time of the offense. ",
    months: 45,
    fine: 2500,
    category: ChargeCategory.FELONY
  },
  {
    id: "mayhem_court_charge_principal",
    code: "",
    title: "Mayhem (Court Charge)",
    description: "The act or acts of unified and significant destruction of public, private, or governmental property with a wanton disregard for safety of persons and an inherent disregard for life or limb.",
    burdenOfProof: "Individuals were apprehended in unison to the event\n \n\nThe individuals utilized weaponry, vehicles, or other destructive means to enact violence upon areas\n \n\nMass destruction was caused via the events caused by the entire group",
    months: 4320,
    fine: 50000,
    category: ChargeCategory.FELONY
  },
  {
    id: "possession_with_intent_to_distribute_marijuana_principal",
    code: "",
    title: "Possession with Intent to Distribute (Marijuana)",
    description: "Any person who is found to have large quantities of controlled substances on their person, vehicle or property.",
    burdenOfProof: " Possess large quantity of controlled substances\n40 or more Marijuana joints\nOR\n5 or more Weed plants/seeds\nOR\nThe defendant is in possession of a weed brick.\n Inferred distribution through circumstance of discovery, pattern of behavior, large sums of money, high grade weaponry, or measuring/packing paraphernalia",
    months: 35,
    fine: 5000,
    category: ChargeCategory.FELONY
  },
  {
    id: "possession_with_intent_to_distribute_marijuana_accessory",
    code: "",
    title: "Possession with Intent to Distribute (Marijuana) (Accessory)",
    description: "Any person who has aided anyone found to have large quantities of controlled substances on their person, vehicle or property.",
    burdenOfProof: " Possess large quantity of controlled substances\n40 or more Marijuana joints\nOR\n5 or more Weed plants/seeds\nOR\nThe defendant is in possession of a weed brick.\n Inferred distribution through circumstance of discovery, pattern of behavior, large sums of money, high grade weaponry, or measuring/packing paraphernalia",
    months: 20,
    fine: 4000,
    category: ChargeCategory.FELONY
  },
  {
    id: "possession_with_intent_to_distribute_marijuana_conspiracy",
    code: "",
    title: "Possession with Intent to Distribute (Marijuana) (Conspiracy)",
    description: "The planning or preparation which has involved physical steps to acquire or arrange the distribution of large quantities of controlled substances.",
    burdenOfProof: " Possess large quantity of controlled substances\n40 or more Marijuana joints\nOR\n5 or more Weed plants/seeds\nOR\nThe defendant is in possession of a weed brick.\n Inferred distribution through circumstance of discovery, pattern of behavior, large sums of money, high grade weaponry, or measuring/packing paraphernalia",
    months: 15,
    fine: 3500,
    category: ChargeCategory.FELONY
  },
  {
    id: "illegal_surveillance_or_filming_principal",
    code: "",
    title: "Illegal Surveillance or Filming",
    description: "The person opperating the equipment or conducting the surveillance",
    burdenOfProof: "The defendant recorded or streamed in a restricted location. \nThe activity was unauthorized and had potential to compromise privacy or safety. ",
    months: 15,
    fine: 1000,
    category: ChargeCategory.MISDEMEANOR
  },
  {
    id: "illegal_surveillance_or_filming_accessory",
    code: "",
    title: "Illegal Surveillance or Filming (Accessory)",
    description: "A person who helped plan or facilitate the act",
    burdenOfProof: "The defendant recorded or streamed in a restricted location. \nThe activity was unauthorized and had potential to compromise privacy or safety. ",
    months: 5,
    fine: 500,
    category: ChargeCategory.MISDEMEANOR
  },
  {
    id: "second_degree_murder_court_charge_principal",
    code: "",
    title: "Second Degree Murder - COURT CHARGE",
    description: "Killing another individual with the intent of killing them without premeditation.",
    burdenOfProof: "The defendant unlawfully killed someone\nThe defendant had the intention to kill\nThe defendant acted without premeditation",
    months: 1440,
    fine: 10000,
    category: ChargeCategory.FELONY
  },
  {
    id: "second_degree_murder_court_charge_accessory",
    code: "",
    title: "Second Degree Murder - COURT CHARGE (Accessory)",
    description: "A person who harbors, assists, or otherwise aids a person who has killed someone but is not necessarily present when the crime occurs. This can be an accessory after the fact: helping to hide the body or weapon, etc.",
    burdenOfProof: "The defendant unlawfully killed someone\nThe defendant had the intention to kill\nThe defendant acted without premeditation",
    months: 720,
    fine: 5500,
    category: ChargeCategory.FELONY
  },
  {
    id: "second_degree_murder_court_charge_attempted",
    code: "",
    title: "Second Degree Murder - COURT CHARGE (Attempted)",
    description: "The defendant made a purposeful attempt to kill another person. but the act did not result in death, and the attempt was made without prior planning.",
    burdenOfProof: "The defendant unlawfully killed someone\nThe defendant had the intention to kill\nThe defendant acted without premeditation",
    months: 0,
    fine: 0,
    category: ChargeCategory.INFRACTION
  },
  {
    id: "second_degree_murder_court_charge_conspiracy",
    code: "",
    title: "Second Degree Murder - COURT CHARGE (Conspiracy)",
    description: "Two or more individuals planning to commit the unlawful killing of another person without premeditation. This is rare but can apply when there is group intent, but no clear premeditation.",
    burdenOfProof: "The defendant unlawfully killed someone\nThe defendant had the intention to kill\nThe defendant acted without premeditation",
    months: 0,
    fine: 0,
    category: ChargeCategory.INFRACTION
  },
  {
    id: "loitering_with_suspicious_intent_principal",
    code: "",
    title: "Loitering with Suspicious Intent",
    description: "The individual lingering with suspicious behavior.",
    burdenOfProof: "The defendant was loitering in a public or restricted space. \nThe behavior was suspicious enough to raise reasonable concern. \nNo lawful reason was provided for being in the area. ",
    months: 10,
    fine: 1000,
    category: ChargeCategory.MISDEMEANOR
  },
  {
    id: "loitering_with_suspicious_intent_attempted",
    code: "",
    title: "Loitering with Suspicious Intent (Attempted)",
    description: "Individual was ordered to leave and returned shortly after without cause.",
    burdenOfProof: "The defendant was loitering in a public or restricted space. \nThe behavior was suspicious enough to raise reasonable concern. \nNo lawful reason was provided for being in the area. ",
    months: 5,
    fine: 750,
    category: ChargeCategory.MISDEMEANOR
  },
  {
    id: "manufacture_of_controlled_substance_meth_principal",
    code: "",
    title: "Manufacture of Controlled Substance (Meth)",
    description: "The unlawful production, preparation, compounding, or processing of the controlled substance Meth.",
    burdenOfProof: "\nBurdens of Proof:\nThe defendant was involved in the production, preparation, or processing of a controlled substance.\nIt is illegal to possess the controlled substance in question.\nThe defendant did not have legal authorization or justification to manufacture the substance",
    months: 100,
    fine: 15000,
    category: ChargeCategory.FELONY
  },
  {
    id: "manufacture_of_controlled_substance_meth_accessory",
    code: "",
    title: "Manufacture of Controlled Substance (Meth) (Accessory)",
    description: "Assisting in the unlawful production, preparation, compounding, or processing of the controlled substance Meth.",
    burdenOfProof: "\nBurdens of Proof:\nThe defendant was involved in the production, preparation, or processing of a controlled substance.\nIt is illegal to possess the controlled substance in question.\nThe defendant did not have legal authorization or justification to manufacture the substance",
    months: 60,
    fine: 10000,
    category: ChargeCategory.FELONY
  },
  {
    id: "manufacture_of_controlled_substance_meth_conspiracy",
    code: "",
    title: "Manufacture of Controlled Substance (Meth) (Conspiracy)",
    description: "Planning to commit the unlawful production, preparation, compounding, or processing of the controlled substance Meth.",
    burdenOfProof: "\nBurdens of Proof:\nThe defendant was involved in the production, preparation, or processing of a controlled substance.\nIt is illegal to possess the controlled substance in question.\nThe defendant did not have legal authorization or justification to manufacture the substance",
    months: 45,
    fine: 5000,
    category: ChargeCategory.FELONY
  },
  {
    id: "weapons_trafficking_court_charge_principal",
    code: "",
    title: "Weapons Trafficking - COURT CHARGE",
    description: "Unlawful transportation of large quantities unlicensed firearms OR firearms with scratched serial numbers OR explosive devices.",
    burdenOfProof: "Possesses/Transports 5 any combination of unlicensed firearms OR firearms with scratched serial numbers OR explosive devices. \nInferred distribution through circumstance of discovery, pattern of behavior, large sums of money, and/or possession",
    months: 4320,
    fine: 40000,
    category: ChargeCategory.FELONY
  },
  {
    id: "contempt_of_court_principal",
    code: "",
    title: "Contempt of Court",
    description: "The act of being disobedient to or discourteous towards a court of law and its officers in the form of behavior that opposes or defies the authority",
    burdenOfProof: "Presiding Justice deems behavior inappropriate or discourteous.\nRepeated offenses may incur jail time",
    months: 1,
    fine: 1,
    category: ChargeCategory.MISDEMEANOR
  },
  {
    id: "unlawful_possession_of_identification_principal",
    code: "",
    title: "Unlawful Possession of Identification",
    description: "The person who knowingly possessed another individuals ID without consent or proper justification",
    burdenOfProof: "The defendant possessed identifying information belonging to another person. \nThe defendant did not have consent to possess it. \nThere is no clear evidence of fraudulent use or intent. ",
    months: 0,
    fine: 500,
    category: ChargeCategory.CITATION
  },
  {
    id: "unlawful_possession_of_identification_accessory",
    code: "",
    title: "Unlawful Possession of Identification (Accessory)",
    description: "A person who knowingly transferred or encouraged possession of someone elses ID without consent",
    burdenOfProof: "The defendant possessed identifying information belonging to another person. \nThe defendant did not have consent to possess it. \nThere is no clear evidence of fraudulent use or intent. ",
    months: 0,
    fine: 500,
    category: ChargeCategory.CITATION
  },
  {
    id: "unlawful_possession_of_identification_conspiracy",
    code: "",
    title: "Unlawful Possession of Identification (Conspiracy)",
    description: "Could apply in heavy scams or multi person ID harvesting. (Is very Rare)",
    burdenOfProof: "The defendant possessed identifying information belonging to another person. \nThe defendant did not have consent to possess it. \nThere is no clear evidence of fraudulent use or intent. ",
    months: 0,
    fine: 500,
    category: ChargeCategory.CITATION
  },
  {
    id: "unlawful_possession_of_identification_attempted",
    code: "",
    title: "Unlawful Possession of Identification (Attempted)",
    description: "Not typically applicable",
    burdenOfProof: "The defendant possessed identifying information belonging to another person. \nThe defendant did not have consent to possess it. \nThere is no clear evidence of fraudulent use or intent. ",
    months: 0,
    fine: 500,
    category: ChargeCategory.CITATION
  },
  {
    id: "desecration_of_a_corpse_tina_donovan_act_principal",
    code: "",
    title: "Desecration of a Corpse (Tina Donovan Act)",
    description: "The individual who directly tampered with, removed, or desecrated a human corpse.",
    burdenOfProof: "The defendant knowingly and willfully made physical contact with or interfered with human remains. \nThe interaction was unlawful, disrespectful, or not done in any official or emergency capacity. \nClear evidence exists that the body was moved, damaged, removed, or treated in a grotesque or degrading manner.",
    months: 180,
    fine: 7500,
    category: ChargeCategory.FELONY
  },
  {
    id: "desecration_of_a_corpse_tina_donovan_act_accessory",
    code: "",
    title: "Desecration of a Corpse (Tina Donovan Act) (Accessory)",
    description: "A person who knowingly aided, enabled, or covered up the desecration of the remains (e.g., driving the corpse away, hiding it, staging props, etc)",
    burdenOfProof: "The defendant knowingly and willfully made physical contact with or interfered with human remains. \nThe interaction was unlawful, disrespectful, or not done in any official or emergency capacity. \nClear evidence exists that the body was moved, damaged, removed, or treated in a grotesque or degrading manner.",
    months: 120,
    fine: 5000,
    category: ChargeCategory.FELONY
  },
  {
    id: "desecration_of_a_corpse_tina_donovan_act_attempted",
    code: "",
    title: "Desecration of a Corpse (Tina Donovan Act) (Attempted)",
    description: "The individual took clear steps to desecrate a corpse but was stopped before completing the act (e.g., digging up a grave, opening a coffin, staging a funeral explosion).",
    burdenOfProof: "The defendant knowingly and willfully made physical contact with or interfered with human remains. \nThe interaction was unlawful, disrespectful, or not done in any official or emergency capacity. \nClear evidence exists that the body was moved, damaged, removed, or treated in a grotesque or degrading manner.",
    months: 90,
    fine: 5000,
    category: ChargeCategory.FELONY
  },
  {
    id: "desecration_of_a_corpse_tina_donovan_act_conspiracy",
    code: "",
    title: "Desecration of a Corpse (Tina Donovan Act) (Conspiracy)",
    description: "Two or more individuals agreeing or planning to interfere with a body unlawfully, regardless of whether the plan was carried out.",
    burdenOfProof: "The defendant knowingly and willfully made physical contact with or interfered with human remains. \nThe interaction was unlawful, disrespectful, or not done in any official or emergency capacity. \nClear evidence exists that the body was moved, damaged, removed, or treated in a grotesque or degrading manner.",
    months: 60,
    fine: 3000,
    category: ChargeCategory.FELONY
  },
  {
    id: "criminal_sale_of_a_firearm_class_1_principal",
    code: "",
    title: "Criminal Sale of a Firearm Class 1",
    description: "Unlawful sale, or purchase, of a Class 1 firearm when a person does not have a valid license.",
    burdenOfProof: " Sale OR Purchase of a Class 1",
    months: 15,
    fine: 3000,
    category: ChargeCategory.MISDEMEANOR
  },
  {
    id: "operating_an_aircraft_without_a_valid_license_principal",
    code: "",
    title: "Operating an Aircraft Without a Valid License",
    description: "The individual actively piloting or attempting to fly the aircraft without proper licensure.",
    burdenOfProof: "The defendant was operating or piloting an aircraft in San Andreas airspace. \nThe defendant did not have a valid flight license on file. \nNo emergency, training exercise, or authorized exemption was in effect. ",
    months: 180,
    fine: 15000,
    category: ChargeCategory.FELONY
  },
  {
    id: "operating_an_aircraft_without_a_valid_license_accessory",
    code: "",
    title: "Operating an Aircraft Without a Valid License (Accessory)",
    description: "A person who knowingly enabled or assisted the flight (e.g., co-pilot, fueling, flight plan assistance).",
    burdenOfProof: "The defendant was operating or piloting an aircraft in San Andreas airspace. \nThe defendant did not have a valid flight license on file. \nNo emergency, training exercise, or authorized exemption was in effect. ",
    months: 60,
    fine: 5000,
    category: ChargeCategory.FELONY
  },
  {
    id: "operating_an_aircraft_without_a_valid_license_attempted",
    code: "",
    title: "Operating an Aircraft Without a Valid License (Attempted)",
    description: "The person took clear steps to operate the aircraft but was stopped or prevented before takeoff.",
    burdenOfProof: "The defendant was operating or piloting an aircraft in San Andreas airspace. \nThe defendant did not have a valid flight license on file. \nNo emergency, training exercise, or authorized exemption was in effect. ",
    months: 40,
    fine: 2500,
    category: ChargeCategory.FELONY
  },
  {
    id: "aggravated_possession_of_personal_harm_explosives_class2_court_charge_principal",
    code: "",
    title: "Aggravated Possession of Personal-Harm Explosives (Class2) (COURT CHARGE)",
    description: "Possession of 5 or more personal-harm explosive devices or any explosive crate intended for violent use.",
    burdenOfProof: "The person possessed 5 or more Class 2 explosive devices,\n OR \nThe person possessed any quantity of explosive crates,\n AND \nThe devices were designed for anti-personnel use, not breaching.",
    months: 7200,
    fine: 500000,
    category: ChargeCategory.FELONY
  },
  {
    id: "possession_of_breaching_explosive_devices_class_1_principal_1",
    code: "",
    title: "Possession of Breaching Explosive Devices (Class 1)",
    description: "Possession of 3-4 breaching explosive device.",
    burdenOfProof: "The person was found in possession of 1–4 breaching explosive devices \nThe devices were capable of being used for vaults, safes, or other mechanical intrusion \nThe person had no lawful reason to possess them (e.g., no law enforcement or demolitions permit)",
    months: 45,
    fine: 5000,
    category: ChargeCategory.FELONY
  },
  {
    id: "possession_of_breaching_explosive_devices_class_1_principal_2",
    code: "",
    title: "Possession of Breaching Explosive Devices (Class 1)",
    description: "Possession of 2 breaching explosive device.",
    burdenOfProof: "The person was found in possession of 1–4 breaching explosive devices \nThe devices were capable of being used for vaults, safes, or other mechanical intrusion \nThe person had no lawful reason to possess them (e.g., no law enforcement or demolitions permit)",
    months: 20,
    fine: 2500,
    category: ChargeCategory.FELONY
  },
  {
    id: "possession_of_breaching_explosive_devices_class_1_principal_3",
    code: "",
    title: "Possession of Breaching Explosive Devices (Class 1)",
    description: "Possession of 1 breaching explosive device.",
    burdenOfProof: "The person was found in possession of 1–4 breaching explosive devices \nThe devices were capable of being used for vaults, safes, or other mechanical intrusion \nThe person had no lawful reason to possess them (e.g., no law enforcement or demolitions permit)",
    months: 10,
    fine: 1000,
    category: ChargeCategory.MISDEMEANOR
  },
  {
    id: "possession_of_personal_harm_explosive_devices_class_2_principal_1",
    code: "",
    title: "Possession of Personal-Harm Explosive Devices (Class 2)",
    description: "Possession of 2 to 4 Class 2 Explosive Device intended to cause personal harm.",
    burdenOfProof: "The person was found in possession of 1 or more Class 2 explosive devices, \nThe device(s) were designed for personal harm, not breaching or property damage, \n﻿\n",
    months: 150,
    fine: 25000,
    category: ChargeCategory.FELONY
  },
  {
    id: "possession_of_personal_harm_explosive_devices_class_2_principal_2",
    code: "",
    title: "Possession of Personal-Harm Explosive Devices (Class 2)",
    description: "Possession of 1 Class 2 Explosive Device intended to cause personal harm (e.g., grenade or molotov).",
    burdenOfProof: "The person was found in possession of 1 or more Class 2 explosive devices, \nThe device(s) were designed for personal harm, not breaching or property damage, \n﻿\n",
    months: 90,
    fine: 15000,
    category: ChargeCategory.FELONY
  },
  {
    id: "exceeding_legal_fish_limit_principal",
    code: "",
    title: "Exceeding Legal Fish Limit",
    description: "Transported more than three full fish coolers per licensed person in a vehicle or stored live fish outside of an approved container.",
    burdenOfProof: "The vehicle contained more than three full fish coolers per licensed individual, whether stored on passengers or in the vehicle\n OR \nLive fish were being transported outside of an approved fish cooler",
    months: 30,
    fine: 4000,
    category: ChargeCategory.FELONY
  },
  {
    id: "criminal_sale_of_a_firearm_class_2_principal",
    code: "",
    title: "Criminal Sale of a Firearm Class 2",
    description: "Unlawful sale, or purchase, of a Class 2 firearm when a person does not have a valid license.",
    burdenOfProof: " Sale OR Purchase of a Class 2",
    months: 60,
    fine: 10000,
    category: ChargeCategory.FELONY
  },
  {
    id: "animal_cruelty_principal",
    code: "",
    title: "Animal Cruelty",
    description: "Intentionally caused harm or death to an animal through abuse, cruelty, or neglect",
    burdenOfProof: "The defendant knowingly harmed, abused, or neglected an animal\n OR \nThe act caused unnecessary pain, injury, or death\n AND \nThe act was not committed in self-defense or as part of approved veterinary care ",
    months: 60,
    fine: 5000,
    category: ChargeCategory.FELONY
  },
  {
    id: "animal_cruelty_accessory",
    code: "",
    title: "Animal Cruelty (Accessory)",
    description: "assisted or enabled another person to harm or abuse an animal",
    burdenOfProof: "The defendant knowingly harmed, abused, or neglected an animal\n OR \nThe act caused unnecessary pain, injury, or death\n AND \nThe act was not committed in self-defense or as part of approved veterinary care ",
    months: 30,
    fine: 3000,
    category: ChargeCategory.FELONY
  },
  {
    id: "animal_cruelty_attempted",
    code: "",
    title: "Animal Cruelty (Attempted)",
    description: "Attempted to abuse or harm an animal but was stopped before injury occurred.",
    burdenOfProof: "The defendant knowingly harmed, abused, or neglected an animal\n OR \nThe act caused unnecessary pain, injury, or death\n AND \nThe act was not committed in self-defense or as part of approved veterinary care ",
    months: 20,
    fine: 2000,
    category: ChargeCategory.MISDEMEANOR
  },
  {
    id: "animal_cruelty_conspiracy",
    code: "",
    title: "Animal Cruelty (Conspiracy)",
    description: "Planned or coordinated to commit and act of animal abuse or cruelty",
    burdenOfProof: "The defendant knowingly harmed, abused, or neglected an animal\n OR \nThe act caused unnecessary pain, injury, or death\n AND \nThe act was not committed in self-defense or as part of approved veterinary care ",
    months: 0,
    fine: 2000,
    category: ChargeCategory.MISDEMEANOR
  },
  {
    id: "improper_use_of_911_emergency_services_principal",
    code: "",
    title: "Improper Use of 911 Emergency Services",
    description: "The person who made the false or misused 911 report.",
    burdenOfProof: "The defendant used 911 for a knowingly false or non-emergency report. \nThe misuse delayed or diverted emergency responders or created false concern. \nThe behavior was intentional or reckless.",
    months: 10,
    fine: 1000,
    category: ChargeCategory.MISDEMEANOR
  },
  {
    id: "improper_use_of_911_emergency_services_accessory",
    code: "",
    title: "Improper Use of 911 Emergency Services (Accessory)",
    description: "A person who helped plan or encourage the false report (e.g., group prank, cover-up).",
    burdenOfProof: "The defendant used 911 for a knowingly false or non-emergency report. \nThe misuse delayed or diverted emergency responders or created false concern. \nThe behavior was intentional or reckless.",
    months: 5,
    fine: 500,
    category: ChargeCategory.CITATION
  },
  {
    id: "introduction_of_invasive_species_into_unauthorized_habitat_principal_1",
    code: "",
    title: "Introduction of Invasive Species into Unauthorized Habitat",
    description: "Released multiple invasive or non-Native species into unauthorized habitats, or did so in a way that could significantly disrupt the local eco system or public safety.",
    burdenOfProof: "The person released or placed an invasive or non-native species into an unauthorized habitat \nThe location was not a natural or approved environment for that species \nThe act was not part of a government-sanctioned ecological project or relocation effort",
    months: 45,
    fine: 7500,
    category: ChargeCategory.FELONY
  },
  {
    id: "introduction_of_invasive_species_into_unauthorized_habitat_principal_2",
    code: "",
    title: "Introduction of Invasive Species into Unauthorized Habitat",
    description: "Released a single invasive or non-native species into an environment where it does not belong",
    burdenOfProof: "The person released or placed an invasive or non-native species into an unauthorized habitat \nThe location was not a natural or approved environment for that species \nThe act was not part of a government-sanctioned ecological project or relocation effort",
    months: 20,
    fine: 3000,
    category: ChargeCategory.MISDEMEANOR
  },
  {
    id: "possession_with_intent_to_distribute_cocaine_principal",
    code: "",
    title: "Possession With Intent To Distribute (Cocaine)",
    description: "Any person who is found to have large quantities of controlled substances on their person, vehicle or property.",
    burdenOfProof: "Possess large quantity of controlled substances\n40 or more cocaine baggies OR\n1 or more cocaine bricks\nInferred distribution through circumstance of discovery, pattern of behavior, large sums of money, high grade weaponry, or measuring/packing paraphernalia",
    months: 110,
    fine: 25000,
    category: ChargeCategory.FELONY
  },
  {
    id: "possession_with_intent_to_distribute_cocaine_accessory",
    code: "",
    title: "Possession With Intent To Distribute (Cocaine) (Accessory)",
    description: "Any person who has aided anyone found to have large quantities of controlled substances on their person, vehicle, or property.",
    burdenOfProof: "Possess large quantity of controlled substances\n40 or more cocaine baggies OR\n1 or more cocaine bricks\nInferred distribution through circumstance of discovery, pattern of behavior, large sums of money, high grade weaponry, or measuring/packing paraphernalia",
    months: 90,
    fine: 20000,
    category: ChargeCategory.FELONY
  },
  {
    id: "possession_with_intent_to_distribute_cocaine_conspiracy",
    code: "",
    title: "Possession With Intent To Distribute (Cocaine) (Conspiracy)",
    description: "The planning or preparation which has involved physical steps to acquire or arrange the distribution of large quantites of controlled substances.",
    burdenOfProof: "Possess large quantity of controlled substances\n40 or more cocaine baggies OR\n1 or more cocaine bricks\nInferred distribution through circumstance of discovery, pattern of behavior, large sums of money, high grade weaponry, or measuring/packing paraphernalia",
    months: 30,
    fine: 10000,
    category: ChargeCategory.FELONY
  },
  {
    id: "littering_principal_1",
    code: "",
    title: "Littering",
    description: "$500 per Item - Max $2,500",
    burdenOfProof: "To establish a violation under this Act, the following criteria must be met:\nAn individual is observed or recorded discarding waste or refuse in a manner that contributes to public pollution or disorder.\nThe incident occurred in a publicly accessible space or private facility at the request of the owner or employee.\nThe provided evidence does not indicate reasonable justification for improper disposal (i.e., emergency situations or lack of accessible trash bins).\nUpon the fifth recorded violation, an individual will be subject to the misdemeanor violation.",
    months: 0,
    fine: 500,
    category: ChargeCategory.MISDEMEANOR
  },
  {
    id: "littering_principal_2",
    code: "",
    title: "Littering",
    description: "$250 per Item - Max $1,250",
    burdenOfProof: "To establish a violation under this Act, the following criteria must be met:\nAn individual is observed or recorded discarding waste or refuse in a manner that contributes to public pollution or disorder.\nThe incident occurred in a publicly accessible space or private facility at the request of the owner or employee.\nThe provided evidence does not indicate reasonable justification for improper disposal (i.e., emergency situations or lack of accessible trash bins).\nUpon the fifth recorded violation, an individual will be subject to the misdemeanor violation.",
    months: 0,
    fine: 250,
    category: ChargeCategory.CITATION
  },
  {
    id: "possession_of_controlled_substance_meth_principal_1",
    code: "",
    title: "Possession of Controlled Substance (Meth)",
    description: "Any person found to have 10+ Meth on their person.",
    burdenOfProof: " Possesses Meth",
    months: 70,
    fine: 6000,
    category: ChargeCategory.FELONY
  },
  {
    id: "possession_of_controlled_substance_meth_principal_2",
    code: "",
    title: "Possession of Controlled Substance (Meth)",
    description: "Any person found to have 5+ Meth on their person.",
    burdenOfProof: " Possesses Meth",
    months: 45,
    fine: 3000,
    category: ChargeCategory.FELONY
  },
  {
    id: "possession_of_controlled_substance_meth_principal_3",
    code: "",
    title: "Possession of Controlled Substance (Meth)",
    description: "Any person found to have 1+ Meth on their person.",
    burdenOfProof: " Possesses Meth",
    months: 25,
    fine: 1200,
    category: ChargeCategory.FELONY
  },
  {
    id: "operation_of_an_unroadworthy_vehicle_principal",
    code: "",
    title: "Operation of an Unroadworthy Vehicle",
    description: "The person operating or knowingly allowing the operation of the unroadworthy vehicle",
    burdenOfProof: "The vehicle was operated on a public road or highway. \nThe vehicle had missing or damaged components, illegal modifications (as listed above ex. Tint), or was otherwise not in a safe or legal condition. \nThe condition of the vehicle could reasonably affect safety, visibility, or the proper operation of the vehicle.\n﻿\n\nDefinitions\n1. Illegal Window Tint\nWindow tint that excessively reduces visibility into or out of the vehicle. This includes:\nTints dark enough to prevent officers from seeing inside the cabin during a stop \nor\nBlacked-out windshields or front windows \nor\nReflective or colored tints that distort visibility\n2. Improper Vehicle Modifications\nModifications that remove or damage core safety components, such as:\nMissing or removed bumpers, doors, hoods, or windshields \nor\nExposed engine blocks, tires, or internal components \nor\nLighting removed or replaced with illegal colors (e.g., red/blue strobes) \nor\nAny alteration that makes the vehicle clearly unsafe or legally questionable",
    months: 0,
    fine: 900,
    category: ChargeCategory.CITATION
  },
  {
    id: "illegal_vehicle_parts_manufacture_distribution_court_charge_principal",
    code: "",
    title: "Illegal Vehicle Parts – Manufacture / Distribution (COURT CHARGE)",
    description: "Manufactured, installed for others, or distributed illegal performance parts.",
    burdenOfProof: "The person manufactured, installed, sold, or distributed a prohibited part.\n AND \nThe part was known to be prohibited for public road use\n AND \nThe action was not authorized under any legitimate business or government license ",
    months: 7200,
    fine: 50000,
    category: ChargeCategory.FELONY
  },
  {
    id: "illegal_vehicle_parts_possession_use_principal",
    code: "",
    title: "Illegal Vehicle Parts – Possession / Use",
    description: "Possessed or installed Tier 3 vehicle parts on a vehicle under their control.",
    burdenOfProof: "The individual was in possession of a banned prohibited part,\n OR \nThe part was installed on a vehicle under the defendant’s control, custody, or active use,\n AND \nThe part is classified as unsafe or banned for public roadway use",
    months: 30,
    fine: 10000,
    category: ChargeCategory.FELONY
  },
  {
    id: "atm_tampering_principal",
    code: "",
    title: "ATM Tampering",
    description: "Unlawfully tampering with an ATM to steal money or obtain personal information.",
    burdenOfProof: "The person altered, damaged, or interfered with the ATM in some way.\nThe person did this with the intent to steal money or obtain personal information to commit fraud.\nThe person did not have permission to access or alter the ATM in any way",
    months: 15,
    fine: 1250,
    category: ChargeCategory.FELONY
  },
  {
    id: "illegal_fish_handling_principal",
    code: "",
    title: "Illegal Fish Handling",
    description: "Possession of live fish outside an approved fish cooler while no actively fishing.",
    burdenOfProof: "The individual was found in possession of live fish in any quantity \nThe fish were not stored inside a standard, fish cooler \nThe individual was not actively fishing at the time",
    months: 0,
    fine: 3000,
    category: ChargeCategory.CITATION
  },
  {
    id: "assault_on_a_government_convoy_principal",
    code: "",
    title: "Assault on a Government Convoy",
    description: "The defendant successfully disrupted a government convoy, including freeing a detainee or inflicting significant damage or harm to thje convoy or its members.",
    burdenOfProof: "The defendant knowingly engaged in an act of violence, obstruction, or interference toward an official convoy. \nThe convoy was engaged in an official government duty at the time of the interference. \nThe action was intended to disrupt government proceedings, cause harm, or free a detainee.",
    months: 400,
    fine: 75000,
    category: ChargeCategory.FELONY
  },
  {
    id: "assault_on_a_government_convoy_accessory",
    code: "",
    title: "Assault on a Government Convoy (Accessory)",
    description: "The defendant knowingly aided, abetted, or facilitated an attack on a government convoy.",
    burdenOfProof: "The defendant knowingly engaged in an act of violence, obstruction, or interference toward an official convoy. \nThe convoy was engaged in an official government duty at the time of the interference. \nThe action was intended to disrupt government proceedings, cause harm, or free a detainee.",
    months: 250,
    fine: 60000,
    category: ChargeCategory.FELONY
  },
  {
    id: "assault_on_a_government_convoy_attempted",
    code: "",
    title: "Assault on a Government Convoy (Attempted)",
    description: "The defendant took substantial steps toward disrupting or attacking a government convoy but failed to carry out the act fully (e.g., intercepted en route, disabled before action, etc).",
    burdenOfProof: "The defendant knowingly engaged in an act of violence, obstruction, or interference toward an official convoy. \nThe convoy was engaged in an official government duty at the time of the interference. \nThe action was intended to disrupt government proceedings, cause harm, or free a detainee.",
    months: 200,
    fine: 40000,
    category: ChargeCategory.FELONY
  },
  {
    id: "assault_on_a_government_convoy_conspiracy",
    code: "",
    title: "Assault on a Government Convoy (Conspiracy)",
    description: "The defendant was part of a plan or agreement to assault a government convoy, regardless of whether the plan was completed",
    burdenOfProof: "The defendant knowingly engaged in an act of violence, obstruction, or interference toward an official convoy. \nThe convoy was engaged in an official government duty at the time of the interference. \nThe action was intended to disrupt government proceedings, cause harm, or free a detainee.",
    months: 120,
    fine: 25000,
    category: ChargeCategory.FELONY
  },
  {
    id: "possession_with_intent_to_distribute_meth_principal",
    code: "",
    title: "Possession with Intent to Distribute (Meth)",
    description: "Any person who has been found to have large quantities of controlled substances on their person, vehicle or property.",
    burdenOfProof: " Possess large quantity of controlled substances\n40 or more Meth baggies OR\n1 or more meth brick \n Inferred distribution through circumstance of discovery, pattern of behavior, large sums of money, high grade weaponry, or measuring/packing paraphernalia",
    months: 80,
    fine: 10000,
    category: ChargeCategory.FELONY
  },
  {
    id: "possession_with_intent_to_distribute_meth_accessory",
    code: "",
    title: "Possession with Intent to Distribute (Meth) (Accessory)",
    description: "Any person who has aided anyone found to have large quantities of controlled substances on their person, vehicle or property.",
    burdenOfProof: " Possess large quantity of controlled substances\n40 or more Meth baggies OR\n1 or more meth brick \n Inferred distribution through circumstance of discovery, pattern of behavior, large sums of money, high grade weaponry, or measuring/packing paraphernalia",
    months: 30,
    fine: 7000,
    category: ChargeCategory.FELONY
  },
  {
    id: "possession_with_intent_to_distribute_meth_conspiracy",
    code: "",
    title: "Possession with Intent to Distribute (Meth) (Conspiracy)",
    description: "The planning or preparation which has involved physical steps to acquire or arrange the distribution of large quantities of controlled substances.",
    burdenOfProof: " Possess large quantity of controlled substances\n40 or more Meth baggies OR\n1 or more meth brick \n Inferred distribution through circumstance of discovery, pattern of behavior, large sums of money, high grade weaponry, or measuring/packing paraphernalia",
    months: 30,
    fine: 4000,
    category: ChargeCategory.FELONY
  },
  {
    id: "theft_of_an_animal_principal",
    code: "",
    title: "Theft of an Animal",
    description: "Any person who unlawfully takes or possesses an animal belonging to another without permission",
    burdenOfProof: "The defendant took or attempted to take an animal belonging to another person.\nThe act was done without the owner’s consent or authorization.\nThe defendant intended to permanently or temporarily deprive the owner of the animal.",
    months: 30,
    fine: 7500,
    category: ChargeCategory.FELONY
  },
  {
    id: "theft_of_an_animal_attempted",
    code: "",
    title: "Theft of an Animal (Attempted)",
    description: "Any person who attempts to take or possess an animal belonging to another without permission",
    burdenOfProof: "The defendant took or attempted to take an animal belonging to another person.\nThe act was done without the owner’s consent or authorization.\nThe defendant intended to permanently or temporarily deprive the owner of the animal.",
    months: 15,
    fine: 3500,
    category: ChargeCategory.MISDEMEANOR
  },
  {
    id: "theft_of_an_animal_accessory",
    code: "",
    title: "Theft of an Animal (Accessory)",
    description: "Any person who conspires to take or possess an animal belonging to another without permission.",
    burdenOfProof: "The defendant took or attempted to take an animal belonging to another person.\nThe act was done without the owner’s consent or authorization.\nThe defendant intended to permanently or temporarily deprive the owner of the animal.",
    months: 0,
    fine: 2500,
    category: ChargeCategory.MISDEMEANOR
  },
  {
    id: "animal_disturbance_principal",
    code: "",
    title: "Animal Disturbance",
    description: "The person responsible for the animal.",
    burdenOfProof: "The animal was present in a public area. \nThe animal was disruptive, uncontained, or posed a safety risk. \nThe defendant brought, owned, or was responsible for the animal.",
    months: 15,
    fine: 750,
    category: ChargeCategory.MISDEMEANOR
  },
  {
    id: "illegal_sale_of_an_animal_principal",
    code: "",
    title: "Illegal Sale of an Animal",
    description: "Any person who has sold an animal without proper licensing. This includes bartering items.",
    burdenOfProof: "The defendant sold or attempted to sell an animal.\nThe sale occurred without valid state or local licensing.\nThe transaction involved an exchange of money, goods, or services for the animal",
    months: 50,
    fine: 10000,
    category: ChargeCategory.FELONY
  },
  {
    id: "illegal_sale_of_an_animal_attempted",
    code: "",
    title: "Illegal Sale of an Animal (Attempted)",
    description: "Any person who has attempted to sell an animal without proper licensing",
    burdenOfProof: "The defendant sold or attempted to sell an animal.\nThe sale occurred without valid state or local licensing.\nThe transaction involved an exchange of money, goods, or services for the animal",
    months: 25,
    fine: 7000,
    category: ChargeCategory.FELONY
  },
  {
    id: "illegal_sale_of_an_animal_conspiracy",
    code: "",
    title: "Illegal Sale of an Animal (Conspiracy)",
    description: "Any person who is conspiring to sell an animal without proper licensing.",
    burdenOfProof: "The defendant sold or attempted to sell an animal.\nThe sale occurred without valid state or local licensing.\nThe transaction involved an exchange of money, goods, or services for the animal",
    months: 10,
    fine: 5000,
    category: ChargeCategory.FELONY
  },
  {
    id: "animal_fighting_court_charge_principal",
    code: "",
    title: "Animal Fighting (Court Charge)",
    description: "Any person who unlawfully forces an animal to engage in combat sports",
    burdenOfProof: "The defendant organized, participated in, or permitted an animal to engage in combat.\nOR\nThe animal was forced or coerced through violent or cruel means.\nAND\nThe act was done for entertainment, sport, or financial gain.",
    months: 0,
    fine: 0,
    category: ChargeCategory.FELONY
  },
  {
    id: "brandishing_a_weapon_principal",
    code: "",
    title: "Brandishing a Weapon",
    description: "The unlawful display or waving of a firearm or any other deadly weapon in a public space, or in the presence of others.",
    burdenOfProof: "The defendant was in possession of a firearm in their hand.\nThe defendant openly displayed or waved the weapon in a public space or in the presence of others.",
    months: 15,
    fine: 1000,
    category: ChargeCategory.MISDEMEANOR
  }
];
