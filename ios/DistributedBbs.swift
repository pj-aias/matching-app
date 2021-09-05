//
//  DistributedBbs.swift
//  MatchingApp
//
//  Created by 牧野青希 on 2021/08/31.
//

import Foundation

@objc(DistributedBBS)
class DistributedBBS: NSObject {

  @objc
  func sign(_ moessage: String, _ credential: String, _ gpk: String, _ seed: String) -> String {
    return ""
  }
  
  @objc
  func verify(_ message: String, _ signature: String, _ gpk: String) -> Bool {
    return true
  }
  
}
